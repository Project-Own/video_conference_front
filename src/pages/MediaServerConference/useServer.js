import { io } from "socket.io-client";
import { Device } from "mediasoup-client";
import { useEffect, useRef, useState } from "react";

const useMediaServer = (roomName, localVideo) => {
  const [otherStreams, setOtherStreams] = useState([]);
  const streams = useRef([]);
  useEffect(() => {
    const socket = io("http://localhost:3000/mediasoup");
    // const roomName = window.location.pathname.split("/")[2];

    console.log(roomName);

    socket.on("connection-success", ({ socketId }) => {
      console.log(socketId);
      getLocalStream();
    });

    let device;

    let rtpCapabilities;

    let producerTransport;
    let consumerTransports = [];
    let producer;
    // let consumer;
    // let isProducer = false;

    let params = {
      // mediasoup params
      encodings: [
        {
          rid: "r0",
          maxBitrate: 100000,
          scalabilityMode: "S1T3",
        },
        {
          rid: "r1",
          maxBitrate: 300000,
          scalabilityMode: "S1T3",
        },
        {
          rid: "r2",
          maxBitrate: 900000,
          scalabilityMode: "S1T3",
        },
      ],
      // https://mediasoup.org/documentation/v3/mediasoup-client/api/#ProducerCodecOptions
      codecOptions: {
        videoGoogleStartBitrate: 1000,
      },
    };

    const streamSuccess = (stream) => {
      console.log(stream);
      localVideo.current.srcObject = stream;
      const track = stream.getVideoTracks()[0];
      params = {
        track,
        ...params,
      };
      joinRoom();
    };

    const joinRoom = () => {
      socket.emit("joinRoom", { roomName }, (data) => {
        console.log("Joining Room");
        console.log(`Router RTP capabilities ${data.rtpCapabilities}`);
        rtpCapabilities = data.rtpCapabilities;

        createDevice();
      });
    };

    const getLocalStream = () => {
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: {
            width: {
              min: 640,
              max: 1920,
            },
            height: {
              min: 400,
              max: 1080,
            },
          },
        })
        .then(streamSuccess)
        .catch((error) => {
          console.log(error.message);
        });
    };

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
        device = new Device();
        await device.load({
          routerRtpCapabilities: rtpCapabilities,
        });

        console.log("Device RTP Capabilities", device.rtpCapabilities);

        createSendTransport();
      } catch (error) {
        console.log(error);
        if (error.name === "UnsupportedError")
          console.warn("browser not supported");
      }
    };

    // const getRtpCapabilities = () => {
    //   socket.emit("createRoom", (data) => {
    //     console.log(`Router RTP capabilities ${data.rtpCapabilities}`);
    //     rtpCapabilities = data.rtpCapabilities;

    //     createDevice();
    //   });
    // };

    socket.on("new-producer", ({ producerId }) => {
      signalNewConsumerTransport(producerId);
    });

    const getProducers = () => {
      socket.emit("getProducers", (producerIds) => {
        console.log(producerIds);
        producerIds.forEach(signalNewConsumerTransport);
      });
    };

    const createSendTransport = () => {
      socket.emit(
        "createWebRtcTransport",
        { consumer: false },
        ({ params }) => {
          if (params.error) {
            console.log(params.error);
            return;
          }
          console.log(params);

          producerTransport = device.createSendTransport(params);

          producerTransport.on(
            "connect",
            async ({ dtlsParameters }, callback, errback) => {
              try {
                await socket.emit("transport-connect", {
                  dtlsParameters,
                });

                callback();
              } catch (error) {
                errback(error);
              }
            }
          );

          producerTransport.on(
            "produce",
            async (parameters, callback, errback) => {
              console.log(parameters);
              try {
                await socket.emit(
                  "transport-produce",
                  {
                    kind: parameters.kind,
                    rtpParameters: parameters.rtpParameters,
                    appData: parameters.appData,
                  },
                  ({ id, producersExist }) => {
                    callback({ id });

                    if (producersExist) getProducers();
                  }
                );
              } catch (error) {
                errback(error);
              }
            }
          );

          connectSendTransport();
        }
      );
    };

    const connectSendTransport = async () => {
      producer = await producerTransport.produce(params);

      producer.on("trackended", () => {
        console.log("track ended");
      });

      producer.on("transportclose", () => {
        console.log("transport ended");
      });
    };

    const signalNewConsumerTransport = async (remoteProducerId) => {
      await socket.emit(
        "createWebRtcTransport",
        { consumer: true },
        ({ params }) => {
          if (params.error) {
            console.log(params.error);
            return;
          }

          console.log(params);

          let consumerTransport;

          try {
            consumerTransport = device.createRecvTransport(params);
          } catch (error) {
            console.log(error);
          }

          consumerTransport.on(
            "connect",
            async ({ dtlsParameters }, callback, errback) => {
              try {
                await socket.emit("transport-recv-connect", {
                  dtlsParameters,
                  serverConsumerTransportId: params.id,
                });

                callback();
              } catch (error) {
                errback(error);
              }
            }
          );
          connectRecvTransport(consumerTransport, remoteProducerId, params.id);
        }
      );
    };

    const connectRecvTransport = async (
      consumerTransport,
      remoteProducerId,
      serverConsumerTransportId
    ) => {
      await socket.emit(
        "consume",
        {
          rtpCapabilities: device.rtpCapabilities,
          remoteProducerId,
          serverConsumerTransportId,
        },
        async ({ params }) => {
          if (params.error) {
            console.log("Cannot consume");
            return;
          }
          console.log(params);

          const consumer = await consumerTransport.consume({
            id: params.id,
            producerId: params.producerId,
            kind: params.kind,
            rtpParameters: params.rtpParameters,
          });

          consumerTransports = [
            ...consumerTransports,
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

          const { track } = consumer;

          // remoteVideo.srcObject = new MediaStream([track]);
          // document.getElementById(remoteProducerId).srcObject = new MediaStream(
          //   [track]
          // );

          // console.log("O", streams.current);
          // console.log("Test", [
          //   ...streams.current,
          //   { id: remoteProducerId, stream: new MediaStream([track]) },
          // ]);
          streams.current = [
            ...streams.current,
            { id: remoteProducerId, stream: new MediaStream([track]) },
          ];

          setOtherStreams(streams.current);

          socket.emit("consumer-resume", {
            serverConsumerId: params.serverConsumerId,
          });
        }
      );
    };

    socket.on("producer-closed", ({ remoteProducerId }) => {
      const producerToClose = consumerTransports.find(
        (transportData) => transportData.producerId === remoteProducerId
      );
      producerToClose.consumerTransport.close();
      producerToClose.consumer.close();

      consumerTransports = consumerTransports.filter(
        (transportData) => transportData.producerId !== remoteProducerId
      );

      // videoContainer.current.removeChild(
      //   document.getElementById(`td-${remoteProducerId}`)
      // );

      streams.current = streams.current.filter((stream) => {
        // console.log("Stream", stream.id);
        // console.log("Stream", remoteProducerId);
        // console.log(stream.id === remoteProducerId);
        return !(stream.id === remoteProducerId);
      });
      console.log(streams.current);
      setOtherStreams(streams.current);
    });
  }, []);

  return {
    otherStreams,
  };
};
export { useMediaServer };
