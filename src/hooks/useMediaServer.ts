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
import { useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { ConferenceContext, PeerStream } from "src/context/ConferenceContext";

const useMediaServer = () => {
  const streams = useRef<{
    [key: string]: PeerStream;
  }>({});

  const {
    webcam,
    screenShare,
    microphone,
    activeSpeaker,
    stream,
    name,
    roomName,
    usingAR,
    setPeers,
    otherStreams,
    setOtherStreams,
    uri,
  } = useContext(ConferenceContext);
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

  const videoProducer = useRef<Producer>();
  const audioProducer = useRef<Producer>();

  const [ready, setReady] = useState(false);

  const joinRoom = () => {
    socket.current?.emit(
      "joinRoom",
      { roomName, name },
      (data: { rtpCapabilities: RtpCapabilities }) => {
        console.log("Joining Room");
        console.log(`Router RTP capabilities ${data.rtpCapabilities}`);
        rtpCapabilities.current = data.rtpCapabilities;

        createDevice();
      }
    );
  };

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

  const getPeers = () => {
    socket.current?.emit(
      "getPeers",
      (peers: {
        [key: string]: {
          isAdmin: boolean;
          name: string;
        };
      }) => {
        console.log("Peers", peers);
        setPeers(peers);
        // producerIds.forEach(signalNewConsumerTransport);
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

                  if (producersExist) {
                    getProducers();
                    getPeers();
                  }
                }
              );
            } catch (error) {
              errback(error);
            }
          }
        );

        setReady(true);
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
        console.log("New Producer Added Params:", params);

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

        const { track, appData, kind } = consumer;

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
          // const vid = streams.current[appData.socketId].stream.getVideoTracks();
          // const aud = streams.current[appData.socketId].stream.getAudioTracks();
          // if (vid && vid.length > 0 && kind === vid[0].kind)
          //   vid.forEach((track) =>
          //     streams.current[appData.socketId].stream.removeTrack(track)
          //   );
          // if (aud && aud.length > 0 && kind === aud[0].kind)
          //   aud.forEach((track) =>
          //     streams.current[appData.socketId].stream.removeTrack(track)
          //   );

          if (kind === "audio") {
            const videoTracks =
              streams.current[appData.socketId].stream.getVideoTracks();
            if (videoTracks && videoTracks.length > 0) {
              streams.current[appData.socketId].stream = new MediaStream([
                track,
                videoTracks[0],
              ]);
            } else {
              streams.current[appData.socketId].stream = new MediaStream([
                track,
              ]);
            }
          } else if (kind === "video") {
            const audioTracks =
              streams.current[appData.socketId].stream.getAudioTracks();
            if (audioTracks && audioTracks.length > 0) {
              streams.current[appData.socketId].stream = new MediaStream([
                track,
                audioTracks[0],
              ]);
            } else {
              streams.current[appData.socketId].stream = new MediaStream([
                track,
              ]);
            }
          }
          streams.current[appData.socketId].stream.addTrack(track);
        } else {
          streams.current[appData.socketId] = {
            id: remoteProducerId,
            peerId: appData.socketId,
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
    let s: PeerStream[] = [];
    let keys = Object.keys(streams.current);

    if (otherStreams.length === 0) {
      keys.forEach((key) => {
        s.push(streams.current[key]);
      });
    }

    if (activeSpeaker.current && activeSpeaker.current.peerId) {
      console.log("Active Speaker", activeSpeaker.current.peerId);
      if (streams.current[activeSpeaker.current.peerId]) {
        s = s.filter(
          (stream) => stream.peerId !== activeSpeaker.current.peerId
        );

        s.unshift(streams.current[activeSpeaker.current.peerId]);
      }
    }

    //     setOtherStreams(s);
    // console.log("Adjusting Peer Stream...");
    // let s: PeerStream[] = [];
    console.log("Other Streams", s);
    // for (const [key, value] of Object.entries(streams.current)) {
    //   console.log(key, value);
    //   if (
    //     key === activeSpeaker.current?.peerId &&
    //     value.id === activeSpeaker.current.producerId
    //   ) {
    //     s = [value, ...s];
    //     continue;
    //   }
    //   s = [...s, value];
    // }
    // console.log(s);
    getPeers();
    setOtherStreams(s);
  };
  const assignListener = () => {
    if (socket.current) {
      socket.current.on("connection-success", ({ socketId }) => {
        console.log("Socket Id", socketId);
        console.log(socket.current?.id);
        socketID.current = socketId;
        joinRoom();
        // getLocalStream();
      });
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
    }
  };
  useEffect(() => {
    if (uri !== "") {
      // const uri = `http://65.1.130.82:3000/mediasoup`;
      console.log("IP", uri);
      socket.current = io(uri, {
        rejectUnauthorized: false,
        secure: false,
      });
      assignListener();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uri]);

  // useEffect(() => {
  //   if (roomName && ready) {
  //     console.log("Room name:", roomName);
  //     joinRoom();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [roomName, ready]);

  useEffect(() => {
    if (!ready) return;
    console.log("ready", ready);
    console.log(stream?.getTracks());
    const audioTrack = stream?.getAudioTracks()[0];
    if (audioTrack) {
      // Audio Track to produces
      if (!audioProducer.current) {
        connectSendTransport("audio", audioTrack).then((producer) => {
          audioProducer.current = producer;
        });
      } else {
        // join(audioTracks[0]);
        audioProducer.current?.replaceTrack({ track: audioTrack });
      }
    }

    // console.log("Stream Tracks", stream?.getVideoTracks());
    const videoTrack = stream?.getVideoTracks()[0];
    if (videoTrack && videoTrack.readyState !== "ended") {
      // Video Track to produces
      if (!videoProducer.current) {
        connectSendTransport("video", videoTrack).then((producer) => {
          videoProducer.current = producer;
        });
        return;
      }
      try {
        // Replace video track if already producer created
        videoProducer.current?.replaceTrack({ track: videoTrack });
      } catch (error) {
        console.log(error);
        // console.log(videoTrack);
      }
    }
  }, [stream, ready]);
  useEffect(() => {
    if (!audioProducer.current) return;
    if (microphone) {
      audioProducer.current.resume();
    } else {
      audioProducer.current.pause();
    }
  }, [microphone, ready]);

  useEffect(() => {
    if (!videoProducer.current) return;
    if (webcam || screenShare || usingAR) {
      videoProducer.current.resume();
    } else {
      videoProducer.current.pause();
    }
  }, [webcam, screenShare, usingAR, ready]);
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
