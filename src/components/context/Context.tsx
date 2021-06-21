/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, FC, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import Peer, { SignalData } from "simple-peer";
import { io } from "socket.io-client";
import { useAudio } from "src/hooks/useAudio";
import { useWebcam } from "src/hooks/useWebcam";
import { addURLPath } from "src/utils/utils";

const SocketContext = createContext<SocketContextProps>(undefined!);

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

interface CallProps {
  isReceivingCall: boolean;
  from: string;
  name: string;
  signal: SignalData;
}
/**
 * Props
 * */
interface SocketContextProps {
  call: CallProps | undefined;
  callAccepted: boolean;
  stream: MediaStream | undefined;
  otherStreams: MediaStream[] | undefined;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;

  roomName: string;
  setRoomName: React.Dispatch<React.SetStateAction<string>>;

  joinRoom: () => void;
  callEnded: boolean;
  me: string;
  callUser: (id: string) => void;
  leaveCall: () => void;
  answerCall: () => void;
}

/**
 * Server Connection
 * */
// const socket = io("http://localhost:5000");
const socket = io("https://video-conference-ar.herokuapp.com/");

/**
 * CAPTURE_MEDIA settings
 * */
const CAPTURE_MEDIA: MediaStreamConstraints = {
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: false,
  },
  video: {
    frameRate: { ideal: 10, max: 15 },
    width: { ideal: 1280 },
    height: { ideal: 720 },
  },
};

let iceServers = {
  iceServers: [
    { urls: "stun:stun.services.mozilla.com" },
    { urls: "stun:stun.l.google.com:19302" },
  ],
};

/**
 *
 * ContextProvider
 * */
const ContextProvider: FC = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState<MediaStream>();
  const [otherStreams, setOtherStreams] = useState<MediaStream[]>([]);
  const [name, setName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [creator, setCreator] = useState(false);
  const [joined, setJoined] = useState(false);
  const [call, setCall] = useState<CallProps>();
  const [me, setMe] = useState("");

  const connectionRef = useRef<Peer.Instance>();

  const history = useHistory();

  const { videoTracks } = useWebcam();
  const { audioTracks } = useAudio();

  const rtcPeerConnection = useRef<RTCPeerConnection>();
  /**
   *
   * update video and audio tracks
   * */
  useEffect(() => {
    const stream = new MediaStream();
    videoTracks?.forEach((track) => stream.addTrack(track));
    audioTracks?.forEach((track) => stream.addTrack(track));

    console.log("VIDEOAUDIOUSEEFFECT");
    console.log(stream);
    console.log(stream?.getTracks()[0]);
    console.log(stream?.getTracks()[1]);
    setStream(stream);
  }, [videoTracks, audioTracks]);

  console.log("VIDEOAUDIO");
  console.log(stream);
  console.log(stream?.getTracks()[0]);
  console.log(stream?.getTracks()[1]);

  /**
   *
   * ComponentDiDMount
   * */
  useEffect(() => {
    // console.log("before");

    // toggleWebcam();
    // toggleMicrophone();

    /**
     *Triggered on receiving an ice candidate from the peer.
     * */
    socket.on(SocketEvent.candidate, (candidate: RTCIceCandidate) => {
      console.log(SocketEvent.candidate);

      const iceCandidate = new RTCIceCandidate(candidate);
      rtcPeerConnection.current?.addIceCandidate(iceCandidate);
    });

    /**
     * Room Created
     * Triggered when a room is succesfully created.
     * */
    socket.on(SocketEvent.created, () => {
      console.log(SocketEvent.created);

      // socket.emit("answer", "s");
      setCreator(true);
    });

    /**
     * Room Full
     * Triggered when a room is full (meaning has 2 people).
     * */
    socket.on(SocketEvent.full, () => {
      alert("Room is full, Cannot join");
    });

    /**
     *  Triggered on receiving an answer from the person who joined the room.
     * */
    socket.on(SocketEvent.answer, (answer) => {
      console.log(SocketEvent.answer);

      rtcPeerConnection.current?.setRemoteDescription(answer);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    /**
     * Triggered when a peer has joined the room and ready to communicat
     * */
    if (roomName !== "") {
      if (creator) {
        socket.on(SocketEvent.ready, () => {
          console.log(SocketEvent.ready);
          console.log(roomName);
          console.log(creator);

          rtcPeerConnection.current = new RTCPeerConnection(iceServers);
          rtcPeerConnection.current.onicecandidate = onIceCandidateFunction;
          rtcPeerConnection.current.ontrack = onTrackFunction;
          // if (stream) {
          //   console.log("CHECKSTREAM");
          //   console.log(stream);
          //   console.log(stream.getTracks()[0]);
          //   console.log(stream.getTracks()[1]);

          //   rtcPeerConnection.current.addTrack(stream.getTracks()[0], stream);
          //   rtcPeerConnection.current.addTrack(stream.getTracks()[1], stream);
          // }
          if (videoTracks)
            rtcPeerConnection.current.addTrack(videoTracks[0], stream!);
          if (audioTracks)
            rtcPeerConnection.current.addTrack(audioTracks[0], stream!);

          rtcPeerConnection.current
            .createOffer()
            .then((offer) => {
              rtcPeerConnection.current?.setLocalDescription(offer);
              console.log(SocketEvent.offer);
              socket.emit(SocketEvent.offer, offer, roomName);
            })
            .catch((error) => console.log(error));
        });
      } else {
        /**
         *  Triggered on receiving an offer from the person who created the room.
         * */
        socket.on(SocketEvent.offer, (offer) => {
          console.log(SocketEvent.offer);
          console.log(roomName);
          console.log(creator);
          rtcPeerConnection.current = new RTCPeerConnection(iceServers);
          rtcPeerConnection.current.onicecandidate = onIceCandidateFunction;
          rtcPeerConnection.current.ontrack = onTrackFunction;
          // if (stream) {
          //   console.log("CHECKSTREAM");

          //   console.log(stream);

          //   console.log(stream.getTracks()[0]);
          //   console.log(stream.getTracks()[1]);

          //   rtcPeerConnection.current.addTrack(stream.getTracks()[0], stream);
          //   rtcPeerConnection.current.addTrack(stream.getTracks()[1], stream);
          // }
          if (videoTracks)
            rtcPeerConnection.current.addTrack(videoTracks[0], stream!);
          if (audioTracks)
            rtcPeerConnection.current.addTrack(audioTracks[0], stream!);

          rtcPeerConnection.current.setRemoteDescription(offer);
          rtcPeerConnection.current
            .createAnswer()
            .then((answer) => {
              rtcPeerConnection.current?.setLocalDescription(answer);
              console.log(SocketEvent.answer);
              socket.emit(SocketEvent.answer, answer, roomName);
            })
            .catch((error) => console.log(error));
        });
      }
    }

    /**
     *
     * */
    const onIceCandidateFunction = (event: RTCPeerConnectionIceEvent) => {
      console.log(SocketEvent.candidate);
      if (event.candidate) {
        socket.emit(SocketEvent.candidate, event.candidate, roomName);
      }
    };

    /**
     *
     * */
    const onTrackFunction = (event: RTCTrackEvent) => {
      console.log("Streams");
      console.log(event);
      console.log(event.streams[0]);

      setOtherStreams((streams) => [...streams, event.streams[0]]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creator, roomName, stream]);

  console.log(creator);

  /**
   * JOIN ROOM
   * */
  const joinRoom = () => {
    /**
     *
     * Join Room
     * */

    if (roomName !== "") {
      history.push(addURLPath(`/room/${roomName}`));
      // console.log(`answer: ${SocketEvent.answer}`);
      socket.emit(SocketEvent.join, roomName);
      // socket.emit(SocketEvent.answer, roomName);
      /**
       *Room Joined          rtcPeerConnection.current.addTrack(stream?.getTracks()[0]!, stream!);

       * Triggered when a room is succesfully joined.
       * */
      socket.on(SocketEvent.joined, () => {
        setCreator(false);

        console.log(SocketEvent.joined);
        console.log(roomName);

        socket.emit(SocketEvent.ready, roomName);
        setJoined(true);
      });
    } else {
      console.log("NONON");
      alert("Cannot have empty roomname");
    }
  };
  /**
   *
   * Answer Call
   * */
  const answerCall = () => {
    setCallAccepted(true);

    const stream = new MediaStream();
    if (videoTracks) videoTracks.forEach((track) => stream.addTrack(track));
    if (audioTracks) audioTracks.forEach((track) => stream.addTrack(track));

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call?.from });
    });

    peer.on("stream", (currentStream) => {
      console.log("Stream");
      console.log("HEYYYY");

      if (otherStreams) {
        setOtherStreams([...otherStreams, currentStream]);
      } else {
        setOtherStreams([currentStream]);
      }
    });

    peer.signal(call?.signal!);

    connectionRef.current = peer;
  };

  /**
   * Call User
   * */
  const callUser = (id: string) => {
    const stream = new MediaStream();
    if (videoTracks) videoTracks.forEach((track) => stream.addTrack(track));
    if (audioTracks) audioTracks.forEach((track) => stream.addTrack(track));

    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on("stream", (currentStream) => {
      console.log("HEYYYY");
      if (otherStreams) {
        setOtherStreams([...otherStreams, currentStream]);
      } else {
        setOtherStreams([currentStream]);
      }
    });

    socket.on("callAccepted", (signal: SignalData) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  /**
   * LeaveCall
   *
   * */
  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current?.destroy();

    socket.close();
    history.goBack();
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        // myVideo,
        // userVideo,
        stream,
        otherStreams,
        name,
        setName,
        roomName,
        setRoomName,
        joinRoom,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
