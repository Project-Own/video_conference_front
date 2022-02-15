import { Device } from "mediasoup-client";
import { Consumer } from "mediasoup-client/lib/Consumer";
import { Producer } from "mediasoup-client/lib/Producer";
import {
  RtpCapabilities,
  RtpParameters,
} from "mediasoup-client/lib/RtpParameters";
import {
  DtlsParameters,
  IceCandidate,
  IceParameters,
  Transport,
} from "mediasoup-client/lib/Transport";
import { useContext, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { ConferenceContext } from "src/context/ConferenceContext";

const useMediaServer = () => {
  const streams = useRef<{
    [key: string]: { id: string; stream: MediaStream };
  }>({});

  const { webcam, screenShare, microphone, stream, setOtherStreams, roomName } =
    useContext(ConferenceContext);
  // const { webcam, webcamVideoTracks } = useWebcam({});
  // const { audioTracks } = useAudio();
  const socket = useRef<Socket>();

  const device = useRef<Device>();

  const rtpCapabilities = useRef<RtpCapabilities>();
  const socketID = useRef<string>("");

  const producerTransport = useRef<Transport>();
  const consumerTransports = useRef<
    {
      consumerTransport: Transport;
      serverConsumerTransportId: string;
      producerId: string;
      consumer: Consumer;
    }[]
  >([]);
  const activeSpeaker =
    useRef<{ producerId: string; peerId: string; volume: number }>();

  const videoProducer = useRef<Producer>();
  const audioProducer = useRef<Producer>();
  // const params = useRef({
  //   videoTrack: {} as MediaStreamTrack,
  //   audioTrack: {} as MediaStreamTrack,
  //   // mediasoup params
  //   encodings: [
  //     {
  //       rid: "r0",
  //       maxBitrate: 100000,
  //       scalabilityMode: "S1T3",
  //     },
  //     {
  //       rid: "r1",
  //       maxBitrate: 300000,
  //       scalabilityMode: "S1T3",
  //     },
  //     {
  //       rid: "r2",
  //       maxBitrate: 900000,
  //       scalabilityMode: "S1T3",
  //     },
  //   ],
  //   // https://mediasoup.org/documentation/v3/mediasoup-client/api/#ProducerCodecOptions
  //   codecOptions: {
  //     videoGoogleStartBitrate: 1000,
  //   },
  // });

  // const streamSuccess = (stream: MediaStream) => {
  //   console.log(stream);
  //   if (localVideo.current) localVideo.current.srcObject = stream;

  //   // const track = stream.getVideoTracks()[0];
  //   params.current = {
  //     ...params.current,
  //     videoTrack: stream.getVideoTracks()[0],
  //     audioTrack: stream.getAudioTracks()[0],
  //   };
  //   joinRoom();
  // };

  const joinRoom = () => {
    socket.current?.emit(
      "joinRoom",
      { roomName },
      (data: { rtpCapabilities: RtpCapabilities }) => {
        console.log("Joining Room");
        console.log(`Router RTP capabilities ${data.rtpCapabilities}`);
        rtpCapabilities.current = data.rtpCapabilities;

        createDevice();
      }
    );
  };

  // const getLocalStream = () => {
  //   navigator.mediaDevices
  //     .getUserMedia({
  //       audio: true,
  //       video: {
  //         width: {
  //           min: 640,
  //           max: 1920,
  //         },
  //         height: {
  //           min: 400,
  //           max: 1080,
  //         },
  //       },
  //     })
  //     .then(streamSuccess)
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // };

  // const goConsume = () => {
  //   goConnect(false);
  // };

  // const goConnect = (producerOrConsumer) => {
  //   isProducer = producerOrConsumer;
  //   device === undefined ? getRtpCapabilities() : goCreateTransport();
  // };

  // const goCreateTransport = () => {
  //   isProducer ? createSendTransport() : createRecvTransport();
  // };

  const createDevice = async () => {
    try {
      device.current = new Device();
      await device.current.load({
        routerRtpCapabilities: rtpCapabilities.current!,
      });

      console.log("Device RTP Capabilities", device.current.rtpCapabilities);

      createSendTransport();
    } catch (error: any) {
      console.log(error);
      if (error.name === "UnsupportedError")
        console.warn("browser not supported");
    }
  };

  const getProducers = () => {
    socket.current?.emit(
      "getProducers",
      (producerIds: { id: string; appData: any }[]) => {
        console.log(producerIds);
        producerIds.forEach(signalNewConsumerTransport);
      }
    );
  };

  const createSendTransport = () => {
    socket.current?.emit(
      "createWebRtcTransport",
      { consumer: false },
      async ({
        params,
      }: {
        params: {
          id: string;
          iceParameters: IceParameters;
          iceCandidates: IceCandidate[];
          dtlsParameters: DtlsParameters;
          error: boolean;
        };
      }) => {
        if (params.error) {
          console.log(params.error);
          return;
        }
        console.log(params);

        producerTransport.current = device.current?.createSendTransport(params);

        producerTransport.current?.on(
          "connect",
          async ({ dtlsParameters }, callback, errback) => {
            try {
              await socket.current?.emit("transport-connect", {
                dtlsParameters,
              });

              callback();
            } catch (error) {
              errback(error);
            }
          }
        );

        producerTransport.current?.on(
          "produce",
          async (parameters, callback, errback) => {
            console.log("Parameters", parameters);
            try {
              await socket.current?.emit(
                "transport-produce",
                {
                  kind: parameters.kind,
                  rtpParameters: parameters.rtpParameters,
                  appData: parameters.appData,
                },
                ({
                  id,
                  producersExist,
                }: {
                  id: string;
                  producersExist: boolean;
                }) => {
                  callback({ id });

                  if (producersExist) getProducers();
                }
              );
            } catch (error) {
              errback(error);
            }
          }
        );
      }
    );
  };

  const connectSendTransport = async (
    kind: "audio" | "video",
    track: MediaStreamTrack
  ) => {
    const producer = await producerTransport.current?.produce({
      encodings: kind === "video" ? camEncodings() : undefined,
      track,
      appData: { mediaTag: kind, socketId: socketID.current },
    });

    producer?.on("trackended", () => {
      console.log("track ended");
    });

    producer?.on("transportclose", () => {
      console.log("transport ended");
    });

    return producer;
  };

  const signalNewConsumerTransport = async ({
    id,
    appData,
  }: {
    id: string;
    appData: any;
  }) => {
    await socket.current?.emit(
      "createWebRtcTransport",
      { consumer: true },
      ({
        params,
      }: {
        params: {
          id: string;
          iceParameters: IceParameters;
          iceCandidates: IceCandidate[];
          dtlsParameters: DtlsParameters;
          error: boolean;
        };
      }) => {
        if (params.error) {
          console.log(params.error);
          return;
        }
        console.log(params);

        let consumerTransport;

        try {
          consumerTransport = device.current?.createRecvTransport(params);
          consumerTransport?.on(
            "connect",
            async ({ dtlsParameters }, callback, errback) => {
              try {
                await socket.current?.emit("transport-recv-connect", {
                  dtlsParameters,
                  serverConsumerTransportId: params.id,
                });

                callback();
              } catch (error) {
                errback(error);
              }
            }
          );
          connectRecvTransport(consumerTransport!, id, params.id, appData);
        } catch (error) {
          console.log(error);
        }
      }
    );
  };

  const connectRecvTransport = async (
    consumerTransport: Transport,
    remoteProducerId: string,
    serverConsumerTransportId: string,
    appData: any
  ) => {
    await socket.current?.emit(
      "consume",
      {
        rtpCapabilities: device.current?.rtpCapabilities,
        remoteProducerId,
        serverConsumerTransportId,
        appData,
      },
      async ({
        params,
      }: {
        params: {
          id: string;
          producerId: string;
          kind: "audio" | "video" | undefined;
          rtpParameters: RtpParameters;
          serverConsumerId: string;
          producerAppData: any;
          error: boolean;
        };
      }) => {
        if (params.error) {
          console.log("Cannot consume");
          return;
        }
        console.log("Consumer Parameters", params);

        const consumer = await consumerTransport.consume({
          id: params.id,
          producerId: params.producerId,
          kind: params.kind,
          rtpParameters: params.rtpParameters,
          appData: params.producerAppData,
        });
        consumerTransports.current = [
          ...consumerTransports.current,
          {
            consumerTransport,
            serverConsumerTransportId: params.id,
            producerId: remoteProducerId,
            consumer,
          },
        ];

        // const newElem = document.createElement("div");
        // newElem.setAttribute("id", `td-${remoteProducerId}`);
        // newElem.setAttribute("class", "remoteVideo");
        // newElem.innerHTML =
        //   '<video id="' +
        //   remoteProducerId +
        //   '" autoplay class="video" ></video>';
        // videoContainer.current.appendChild(newElem);

        const { track, appData } = consumer;

        // remoteVideo.srcObject = new MediaStream([track]);
        // document.getElementById(remoteProducerId).srcObject = new MediaStream(
        //   [track]
        // );

        // console.log("O", streams.current);
        // console.log("Test", [
        //   ...streams.current,
        //   { id: remoteProducerId, stream: new MediaStream([track]) },
        // ]);
        console.log(streams.current[appData.socketId]);

        if (streams.current[appData.socketId]) {
          streams.current[appData.socketId].stream.addTrack(track);
        } else {
          streams.current[appData.socketId] = {
            id: remoteProducerId,
            stream: new MediaStream([track]),
          };
        }

        // streams.current = [
        //   ...streams.current,
        //   {
        //     id: remoteProducerId,
        //     peerId: appData.socketId,
        //     stream: new MediaStream([track]),
        //   },
        // ];

        // setOtherStreams(streams.current);
        adjustPeerStream();

        socket.current?.emit("consumer-resume", {
          serverConsumerId: params.serverConsumerId,
        });
      }
    );
  };
  const adjustPeerStream = () => {
    let s: { id: string; stream: MediaStream }[] = [];
    console.log(streams.current);
    for (const [key, value] of Object.entries(streams.current)) {
      console.log(key, value);
      if (
        key === activeSpeaker.current?.peerId &&
        value.id === activeSpeaker.current.producerId
      ) {
        s = [value, ...s];
        continue;
      }
      s = [...s, value];
    }
    console.log(s);
    setOtherStreams(s);
  };

  useEffect(() => {
    // const roomName = window.location.pathname.split("/")[2];

    console.log(roomName);
    socket.current = io("https://localhost:3000/mediasoup");

    socket.current.on("connection-success", ({ socketId }) => {
      console.log("Socket Id", socketId);
      console.log(socket.current?.id);
      socketID.current = socketId;
      // getLocalStream();
    });

    // let consumer;
    // let isProducer = false;

    // const getRtpCapabilities = () => {
    //   socket.emit("createRoom", (data) => {
    //     console.log(`Router RTP capabilities ${data.rtpCapabilities}`);
    //     rtpCapabilities = data.rtpCapabilities;

    //     createDevice();
    //   });
    // };

    socket.current.on(
      "new-producer",
      ({ id, appData }: { id: string; appData: any }) => {
        console.log("New Producer added: ", id, appData);
        signalNewConsumerTransport({ id, appData });
      }
    );

    socket.current.on("producer-closed", ({ remoteProducerId }) => {
      const producerToClose = consumerTransports.current.find(
        (transportData) => transportData.producerId === remoteProducerId
      );

      producerToClose?.consumerTransport.close();
      producerToClose?.consumer.close();

      consumerTransports.current = consumerTransports.current.filter(
        (transportData) => transportData.producerId !== remoteProducerId
      );

      // videoContainer.current.removeChild(
      //   document.getElementById(`td-${remoteProducerId}`)
      // );

      delete streams.current[producerToClose?.consumer.appData.socketId];

      // streams.current = streams.current.filter((stream) => {
      //   // console.log("Stream", stream.id);
      //   // console.log("Stream", remoteProducerId);
      //   // console.log(stream.id === remoteProducerId);
      //   return !(stream.id === remoteProducerId);
      // });
      // console.log(streams.current);
      // setOtherStreams(streams.current);
      adjustPeerStream();
    });
    // io.emit("active-speaker", { activeSpeaker: rooms[roomName].activeSpeaker });

    socket.current.on(
      "active-speaker",
      (params: { activeSpeaker: typeof activeSpeaker.current }) => {
        activeSpeaker.current = params.activeSpeaker;
        console.log("Active Speaker", params.activeSpeaker);
        if (
          activeSpeaker.current?.peerId === socket.current?.id ||
          activeSpeaker.current?.peerId === null
        )
          return;
        adjustPeerStream();
      }
    );
    // getLocalStream();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (roomName) {
      joinRoom();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomName]);

  useEffect(() => {
    const audioTrack = stream?.getAudioTracks()[0];
    if (audioTrack) {
      // Audio Track to produces
      if (!audioProducer.current) {
        connectSendTransport("audio", audioTrack).then((producer) => {
          audioProducer.current = producer;
        });
        return;
      }

      // join(audioTracks[0]);
      audioProducer.current?.replaceTrack({ track: audioTrack });
    }

    const videoTrack = stream?.getVideoTracks()[0];
    if (videoTrack) {
      // Video Track to produces
      if (!videoProducer.current) {
        connectSendTransport("video", videoTrack).then((producer) => {
          videoProducer.current = producer;
        });
        return;
      }
      // Replace video track if already producer created
      videoProducer.current?.replaceTrack({ track: videoTrack });
    }
  }, [stream]);
  useEffect(() => {
    if (!audioProducer.current) return;
    if (microphone) {
      audioProducer.current.resume();
    } else {
      audioProducer.current.pause();
    }
  }, [microphone]);

  useEffect(() => {
    if (!videoProducer.current) return;
    if (webcam || screenShare) {
      videoProducer.current.resume();
    } else {
      videoProducer.current.pause();
    }
  }, [webcam, screenShare]);
};
export { useMediaServer };

//
// encodings for outgoing video
//

// just two resolutions, for now, as chrome 75 seems to ignore more
// than two encodings
//
const CAM_VIDEO_SIMULCAST_ENCODINGS = [
  { maxBitrate: 96000, scaleResolutionDownBy: 4 },
  { maxBitrate: 680000, scaleResolutionDownBy: 1 },
];

// const CAM_VIDEO_SIMULCAST_ENCODINGS = [
//   {
//     rid: "r0",
//     maxBitrate: 100000,
//     scalabilityMode: "S1T3",
//   },
//   {
//     rid: "r1",
//     maxBitrate: 300000,
//     scalabilityMode: "S1T3",
//   },
//   {
//     rid: "r2",
//     maxBitrate: 900000,
//     scalabilityMode: "S1T3",
//   },
// ];

function camEncodings() {
  return CAM_VIDEO_SIMULCAST_ENCODINGS;
}

// how do we limit bandwidth for screen share streams?
//
// function screenshareEncodings() {
//   return null;
// }
