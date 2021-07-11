/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, FC, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import Peer, { SignalData } from "simple-peer";
import { io } from "socket.io-client";
import { HTMLCanvasElementWithCaptureStream } from "src/utils/StreamMerger";
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
  arStream: MediaStream | undefined;
  setStream: React.Dispatch<React.SetStateAction<MediaStream | undefined>>;
  setArStream: React.Dispatch<React.SetStateAction<MediaStream | undefined>>;

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

let iceServers = {
  iceServers: [
    { urls: "stun:stun.services.mozilla.com" },
    { urls: "stun:stun.l.google.com:19302" },
  ],
};

/**
 * Black Silence (Dummy Stream)
 * */
let silence = () => {
  let ctx = new AudioContext(),
    oscillator = ctx.createOscillator();

  let audioDestination = ctx.createMediaStreamDestination();
  let dst = oscillator.connect(audioDestination);
  oscillator.start();

  return Object.assign(audioDestination.stream.getAudioTracks()[0], {
    enabled: false,
  });
};

interface props {
  width: number;
  height: number;
}
let black = ({ width = 640, height = 480 }: props) => {
  let canvas: HTMLCanvasElementWithCaptureStream = Object.assign(
    document.createElement("canvas"),
    {
      width,
      height,
    }
  );
  canvas?.getContext("2d")?.fillRect(0, 0, width, height);

  let stream: MediaStream | null = null;
  if (canvas.captureStream) {
    stream = canvas?.captureStream();
  }
  return Object.assign(stream?.getVideoTracks()[0], { enabled: false });
};

let blackSilence = (props?: props) =>
  new MediaStream([black({ ...props! }), silence()]);
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

  const [arStream, setArStream] = useState<MediaStream>();

  const connectionRef = useRef<Peer.Instance>();

  const history = useHistory();

  const rtcPeerConnection = useRef<RTCPeerConnection>();

  useEffect(() => {
    try {
      const videoTrack =
        stream?.getVideoTracks().length! > 0
          ? stream?.getVideoTracks()[0]
          : null;
      // const audioTrack =
      //   stream?.getAudioTracks().length! > 0 ? stream?.getAudioTracks()[0] : null;
      const sender = rtcPeerConnection.current?.getSenders().find((s) => {
        return s.track?.kind === videoTrack?.kind;
      });
      console.log(`Found sender: ${sender}`);
      sender?.replaceTrack(videoTrack!);
    } catch (error) {
      console.log(error);
    }
  }, [stream]);

  /**
   *
   * ComponentDiDMount
   * */
  useEffect(() => {
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
          rtcPeerConnection.current = new RTCPeerConnection(iceServers);
          rtcPeerConnection.current.onicecandidate = onIceCandidateFunction;
          rtcPeerConnection.current.ontrack = onTrackFunction;
          const stream = blackSilence();

          rtcPeerConnection.current.addTrack(stream.getTracks()[0], stream);
          rtcPeerConnection.current.addTrack(stream.getTracks()[1], stream);

          // console.log("________CHECKSTREAM______");

          // console.log(videoTracks);
          // if (videoTracks) rtcPeerConnection.current.addTrack(videoTracks[0]);
          // if (audioTracks) rtcPeerConnection.current.addTrack(audioTracks[0]);

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

          const stream = blackSilence();

          rtcPeerConnection.current.addTrack(stream.getTracks()[0], stream);
          rtcPeerConnection.current.addTrack(stream.getTracks()[1], stream);

          console.log("________CHECKSTREAM______");

          // if (videoTracks) rtcPeerConnection.current.addTrack(videoTracks[0]);
          // if (audioTracks) rtcPeerConnection.current.addTrack(audioTracks[0]);

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

      setOtherStreams([...event.streams]);
      // setOtherStreams((streams) => [...streams, event.streams[0]]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creator, roomName]);

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
    // if (videoTracks) videoTracks.forEach((track) => stream.addTrack(track));
    // if (audioTracks) audioTracks.forEach((track) => stream.addTrack(track));

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
    // if (videoTracks) videoTracks.forEach((track) => stream.addTrack(track));
    // if (audioTracks) audioTracks.forEach((track) => stream.addTrack(track));

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
        arStream,
        setArStream,
        stream,
        setStream,
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
