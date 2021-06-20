import React, { createContext, FC, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import Peer from "simple-peer";
import { io } from "socket.io-client";
import { useAudio } from "src/hooks/useAudio";
import { useWebcam } from "src/hooks/useWebcam";

const SocketContext = createContext<SocketContextProps>(undefined!);

interface CallProps {
  isReceivingCall: boolean;
  from: string;
  name: string;
  signal: any;
}

interface SocketContextProps {
  call: CallProps | undefined;
  callAccepted: boolean;
  // myVideo: React.RefObject<HTMLVideoElement>;
  // userVideo: React.RefObject<HTMLVideoElement>;
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

// const socket = io('http://localhost:5000');
const socket = io("https://video-conference-ar.herokuapp.com/");

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

const ContextProvider: FC = ({ children }) => {
  console.log("how how");
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState<MediaStream>();
  const [otherStreams, setOtherStreams] = useState<MediaStream[]>();
  const [name, setName] = useState("");
  const [call, setCall] = useState<CallProps>();
  const [me, setMe] = useState("");

  // const myVideo = useRef<HTMLVideoElement>(null);
  // const userVideo = useRef<HTMLVideoElement>(null);
  const connectionRef = useRef<Peer.Instance>();

  // console.log("myVideo");
  // console.log(myVideo);
  // console.log("userVideo");
  // console.log(userVideo);
  const {
    // audioDevices,
    // microphone,
    // activeAudioDevice,
    // setActiveAudioDevice,

    audioTracks,
    toggleMicrophone,
  } = useAudio(CAPTURE_MEDIA);

  const {
    // videoDevices,
    // webcam,
    // activeVideoDevice,
    // setActiveVideoDevice,

    videoTracks,
    toggleWebcam,
  } = useWebcam(CAPTURE_MEDIA);

  const history = useHistory();

  useEffect(() => {
    let outputTracks: MediaStreamTrack[] = [];
    outputTracks = videoTracks
      ? outputTracks.concat(videoTracks!)
      : outputTracks;
    outputTracks = audioTracks
      ? outputTracks.concat(audioTracks!)
      : outputTracks;

    const stream = new MediaStream(outputTracks);
    setStream(stream);
  }, [audioTracks, videoTracks]);

  useEffect(() => {
    console.log("before");
    // navigator.mediaDevices
    //   .getUserMedia({ video: true, audio: true })
    //   .then((currentStream) => {
    //     setStream(currentStream);
    //     console.log("after");
    //     const s: any = [currentStream];
    //     const h: any = [currentStream, ...s];

    //     console.log(h);
    //     console.log(h[0]);
    //     // if (myVideo.current) {
    //     //   myVideo.current.srcObject = currentStream;
    //     // }
    //   });

    toggleWebcam();
    toggleMicrophone();

    socket.on("me", (id) => setMe(id));

    socket.on("callUser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call?.from });
    });

    peer.on("stream", (currentStream) => {
      console.log("Stream");

      setOtherStreams([...otherStreams!, currentStream]);
      // if (userVideo.current) {
      //   userVideo.current.srcObject = currentStream;
      // }
    });

    peer.signal(call?.signal);

    connectionRef.current = peer;
  };

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
      setOtherStreams([currentStream]);

      // if (userVideo.current) {
      //   userVideo.current.srcObject = currentStream;
      // }
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

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
