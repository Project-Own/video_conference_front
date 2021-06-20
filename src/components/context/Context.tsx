import React, { createContext, FC, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import Peer, { SignalData } from "simple-peer";
import { io } from "socket.io-client";
import { useAudio } from "src/hooks/useAudio";
import { useWebcam } from "src/hooks/useWebcam";

const SocketContext = createContext<SocketContextProps>(undefined!);

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
  callEnded: boolean;
  me: string;
  callUser: (id: string) => void;
  leaveCall: () => void;
  answerCall: () => void;
}

/**
 * Server Connection
 * */
// const socket = io('http://localhost:5000');
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

/**
 *
 * ContextProvider
 * */
const ContextProvider: FC = ({ children }) => {
  console.log("how how");
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState<MediaStream>();
  const [otherStreams, setOtherStreams] = useState<MediaStream[]>();
  const [name, setName] = useState("");
  const [call, setCall] = useState<CallProps>();
  const [me, setMe] = useState("");

  const connectionRef = useRef<Peer.Instance>();

  const history = useHistory();

  const { videoTracks, toggleWebcam } = useWebcam(CAPTURE_MEDIA);
  const { audioTracks, toggleMicrophone } = useAudio(CAPTURE_MEDIA);

  console.log("Hello");

  /**
   *
   * update video and audio tracks
   * */
  useEffect(() => {
    const stream = new MediaStream();
    if (videoTracks) videoTracks.forEach((track) => stream.addTrack(track));
    if (audioTracks) audioTracks.forEach((track) => stream.addTrack(track));

    setStream(stream);
  }, [videoTracks, audioTracks]);
  /**
   *
   * ComponentDiDMount
   * */
  useEffect(() => {
    console.log("before");

    toggleWebcam();
    toggleMicrophone();

    socket.on("me", (id) => setMe(id));

    socket.on("callUser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   *
   * Answer Call
   * */
  const answerCall = () => {
    setCallAccepted(true);

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
    history.go(0);
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
