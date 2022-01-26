/**
 * Server Connection
 * */
// const socket = io("http://localhost:5000");
import { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { io, Socket } from "socket.io-client";
import { useAudio } from "src/hooks/useAudio";
import { SocketContext } from "src/pages/Context/Context";
import { blackSilence } from "src/utils/utils";

const iceServers: RTCConfiguration = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    {
      urls: "turn:numb.viagenie.ca",
      credential: "webrtcOk",
      username: "sahasprajapati@gmail.com",
    },
    {
      username:
        "Y-P611Yxam-VWk07XOIOi5sUenK9pXKzPwgpBOMw0HoFUndQZUhSpbFVftjS5uajAAAAAGDrAxdiMTBwcmFqYXBhdGk=",
      credential: "12adc36a-e256-11eb-b7ac-0242ac140004",
      urls: [
        // "turn:bn-turn1.xirsys.com:80?transport=udp",
        "turn:bn-turn1.xirsys.com:3478?transport=udp",
        // "turn:bn-turn1.xirsys.com:80?transport=tcp",
        // "turn:bn-turn1.xirsys.com:3478?transport=tcp",
        // "turns:bn-turn1.xirsys.com:443?transport=tcp",
        "turns:bn-turn1.xirsys.com:5349?transport=tcp",
      ],
    },
  ],
};

export enum SocketEvent {
  created = "created",
  joined = "joined",
  join = "join",
  full = "full",
  ready = "ready",
  candidate = "candidate",
  offer = "offer",
  answer = "answer",
}

const useSocket = () => {
  const [creator, setCreator] = useState(false);
  const socketConnection = useRef<Socket | null>(null);
  const rtcPeerConnection = useRef<RTCPeerConnection | null>(null);

  const { stream, setOtherStreams } = useContext(SocketContext);

  const [connected, setConnected] = useState(false);
  const { audioTracks } = useAudio();

  const location = useLocation();
  const roomName = location.pathname.split("/room/")[1];

  useEffect(() => {
    try {
      const videoTrack =
        stream?.getVideoTracks().length! > 0
          ? stream?.getVideoTracks()[0]
          : null;
      const audioTrack =
        audioTracks && audioTracks?.length! > 0 ? audioTracks[0] : null;

      const videoSender = rtcPeerConnection.current?.getSenders().find((s) => {
        return s.track?.kind === videoTrack?.kind;
      });
      // console.log(`Found video sender: ${videoSender}`);
      videoSender?.replaceTrack(videoTrack!);

      const audioSender = rtcPeerConnection.current?.getSenders().find((s) => {
        return s.track?.kind === audioTrack?.kind;
      });
      // console.log(`Found audio sender: ${audioSender}`);
      audioSender?.replaceTrack(audioTrack!);
    } catch (error) {
      console.log(error);
    }
  }, [stream, connected, audioTracks]);

  /**
   *
   * ComponentDiDMount
   * */
  useEffect(() => {
    /**
     * JOIN ROOM
     * */
    socketConnection.current = io("https://video-conference-ar.herokuapp.com/");

    /**
     *Triggered on receiving an ice candidate from the peer.
     * */
    socketConnection.current?.on(
      SocketEvent.candidate,
      (candidate: RTCIceCandidate) => {
        console.log(SocketEvent.candidate);

        const iceCandidate = new RTCIceCandidate(candidate);
        rtcPeerConnection.current?.addIceCandidate(iceCandidate);
      }
    );

    /**
     * Room Created
     * Triggered when a room is succesfully created.
     * */
    socketConnection.current?.on(SocketEvent.created, () => {
      console.log(SocketEvent.created);

      setCreator(true);
    });

    /**
     * Room Full
     * Triggered when a room is full (meaning has 2 people).
     * */
    socketConnection.current?.on(SocketEvent.full, () => {
      alert("Room is full, Cannot join");
    });

    /**
     *  Triggered on receiving an answer from the person who joined the room.
     * */
    socketConnection.current?.on(SocketEvent.answer, (answer) => {
      console.log(SocketEvent.answer);

      rtcPeerConnection.current?.setRemoteDescription(answer);
    });

    /**
     *
     * Join Room
     * */

    if (roomName !== "") {
      socketConnection.current?.emit(SocketEvent.join, roomName);

      /**
        *Room Joined          rtcPeerConnection.current.addTrack(stream?.getTracks()[0]!, stream!);
 
        * Triggered when a room is succesfully joined.
        * */
      socketConnection.current?.on(SocketEvent.joined, () => {
        setCreator(false);

        console.log(SocketEvent.joined);
        console.log(roomName);

        socketConnection.current?.emit(SocketEvent.ready, roomName);
      });
    } else {
      alert("Cannot have empty roomname");
    }

    return () => {
      rtcPeerConnection.current?.close();
      socketConnection.current?.close();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    /**
     * Triggered when a peer has joined the room and ready to communicat
     * */
    if (roomName !== "") {
      if (creator) {
        socketConnection.current?.on(SocketEvent.ready, () => {
          rtcPeerConnection.current = new RTCPeerConnection(iceServers);
          rtcPeerConnection.current.onicecandidate = onIceCandidateFunction;
          rtcPeerConnection.current.oniceconnectionstatechange =
            onIceConnectionStateChange;
          rtcPeerConnection.current.ontrack = onTrackFunction;

          const stream = blackSilence();

          rtcPeerConnection.current.addTrack(stream.getTracks()[0], stream);
          rtcPeerConnection.current.addTrack(stream.getTracks()[1], stream);

          rtcPeerConnection.current
            .createOffer()
            .then((offer) => {
              rtcPeerConnection.current?.setLocalDescription(offer);

              socketConnection.current?.emit(
                SocketEvent.offer,
                offer,
                roomName
              );
            })
            .catch((error) => console.log(error));
        });
      } else {
        /**
         *  Triggered on receiving an offer from the person who created the room.
         * */
        socketConnection.current?.on(SocketEvent.offer, (offer) => {
          console.log(SocketEvent.offer);
          console.log(roomName);
          console.log(creator);
          rtcPeerConnection.current = new RTCPeerConnection(iceServers);
          rtcPeerConnection.current.onicecandidate = onIceCandidateFunction;
          rtcPeerConnection.current.oniceconnectionstatechange =
            onIceConnectionStateChange;
          rtcPeerConnection.current.ontrack = onTrackFunction;

          const stream = blackSilence();

          rtcPeerConnection.current.addTrack(stream.getTracks()[0], stream);
          rtcPeerConnection.current.addTrack(stream.getTracks()[1], stream);

          rtcPeerConnection.current.setRemoteDescription(offer);
          rtcPeerConnection.current
            .createAnswer()
            .then((answer) => {
              rtcPeerConnection.current?.setLocalDescription(answer);

              socketConnection.current?.emit(
                SocketEvent.answer,
                answer,
                roomName
              );
            })
            .catch((error) => console.log(error));
        });
      }
    }

    /**
     *
     * */
    const onIceCandidateFunction = (event: RTCPeerConnectionIceEvent) => {
      // console.log(SocketEvent.candidate);
      // setConnected(true);

      if (event.candidate) {
        socketConnection.current?.emit(
          SocketEvent.candidate,
          event.candidate,
          roomName
        );
      }
    };

    /**
     *
     *
     * */

    const onIceConnectionStateChange = () => {
      switch (rtcPeerConnection.current?.iceConnectionState) {
        case "closed":
          setConnected(false);

          setOtherStreams([]);
          console.log("Peer Disconnected");
          break;

        case "disconnected":
          setConnected(false);

          setOtherStreams([]);
          console.log("Peer Disconnected");
          break;
        case "completed":
          setConnected(false);
          setConnected(true);
          console.log("Peer Connected");
          break;
        case "connected":
          setConnected(false);
          setConnected(true);
          console.log("Peer Connected");
          break;
        case "new":
          setConnected(false);
          console.log("Peer Connected");
          break;

        default:
      }
    };
    /**
     *
     * */
    const onTrackFunction = (event: RTCTrackEvent) => {
      // console.log("Streams");
      // console.log(event);
      // console.log(event.streams[0]);

      setOtherStreams([...event.streams]);
      // setOtherStreams((streams) => [...streams, event.streams[0]]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creator, roomName]);
};
export default useSocket;
