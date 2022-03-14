/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, FC, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageInterface } from "src/components/BottomComponents/gridview/messageList";
import { addURLPath } from "src/utils/utils";
const ConferenceContext = createContext<ConferenceContextProps>(undefined!);

// interface CallProps {
//   isReceivingCall: boolean;
//   from: string;
//   name: string;
//   signal: SignalData;
// }
export interface PeerStream {
  id: string;
  stream: MediaStream;
  peerId: string;
}
/**
 * Props
 * */
interface ConferenceContextProps {
  stream: MediaStream | undefined;
  otherStreams: PeerStream[];
  name: string;
  roomName: string | undefined;

  microphone: boolean;
  webcam: boolean;
  screenShare: boolean;
  chat: boolean;
  participant: boolean;
  call: boolean;
  setting: boolean;
  usingAR: boolean;
  usingGesture: boolean;
  usingTrainedGesture: boolean;
  webcamDeviceId: string;
  microphoneDeviceId: string;
  webcamDevices: MediaDeviceInfo[];
  microphoneDevices: MediaDeviceInfo[];
  modelName: string;
  webcamTrack: MediaStreamTrack | undefined;
  showCORSInfo: boolean;
  peers: {
    [key: string]: {
      isAdmin: boolean;
      name: string;
    };
  };
  activeSpeaker: React.MutableRefObject<{
    producerId: string | null;
    peerId: string | null;
    volume: number | null;
  }>;

  message: string;
  chatMessage: string;
  messages: MessageInterface[];

  gesture: string;
  trainedGesture: string;

  uri: string;
  frame: React.MutableRefObject<number>;

  setUri: React.Dispatch<React.SetStateAction<string>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;

  setChatMessage: React.Dispatch<React.SetStateAction<string>>;
  setMessages: React.Dispatch<React.SetStateAction<MessageInterface[]>>;

  setGesture: React.Dispatch<React.SetStateAction<string>>;
  setTrainedGesture: React.Dispatch<React.SetStateAction<string>>;

  setPeers: React.Dispatch<
    React.SetStateAction<{
      [key: string]: {
        isAdmin: boolean;
        name: string;
      };
    }>
  >;
  setShowCORSInfo: React.Dispatch<React.SetStateAction<boolean>>;
  setWebcamTrack: React.Dispatch<
    React.SetStateAction<MediaStreamTrack | undefined>
  >;
  setModelName: React.Dispatch<React.SetStateAction<string>>;
  setMicrophone: React.Dispatch<React.SetStateAction<boolean>>;
  setWebcam: React.Dispatch<React.SetStateAction<boolean>>;
  setScreenShare: React.Dispatch<React.SetStateAction<boolean>>;
  setChat: React.Dispatch<React.SetStateAction<boolean>>;
  setCall: React.Dispatch<React.SetStateAction<boolean>>;
  setSetting: React.Dispatch<React.SetStateAction<boolean>>;
  setParticipant: React.Dispatch<React.SetStateAction<boolean>>;
  setUsingAR: React.Dispatch<React.SetStateAction<boolean>>;
  setUsingGesture: React.Dispatch<React.SetStateAction<boolean>>;
  setUsingTrainedGesture: React.Dispatch<React.SetStateAction<boolean>>;
  setWebcamDeviceId: React.Dispatch<React.SetStateAction<string>>;
  setMicrophoneDeviceId: React.Dispatch<React.SetStateAction<string>>;
  setOtherStreams: React.Dispatch<React.SetStateAction<PeerStream[]>>;
  setStream: React.Dispatch<React.SetStateAction<MediaStream>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setRoomName: React.Dispatch<React.SetStateAction<string | undefined>>;
  setWebcamDevices: React.Dispatch<React.SetStateAction<MediaDeviceInfo[]>>;
  setMicrophoneDevices: React.Dispatch<React.SetStateAction<MediaDeviceInfo[]>>;
  toggle: (
    type:
      | "microphone"
      | "webcam"
      | "screenShare"
      | "chat"
      | "call"
      | "setting"
      | "usingAR"
      | "usingGesture"
      | "participant"
      | "usingTrainedGesture"
  ) => void;

  joinRoom: (room: string, name: string) => void;
  leaveCall: () => void;
}

/**
 *
 * ConferenceContextProvider
 * */
const ConferenceContextProvider: FC = ({ children }) => {
  const [stream, setStream] = useState<MediaStream>(new MediaStream([]));
  const [otherStreams, setOtherStreams] = useState<PeerStream[]>([]);
  const [peers, setPeers] = useState<{
    [key: string]: {
      isAdmin: boolean;
      name: string;
    };
  }>({});
  const [showCORSInfo, setShowCORSInfo] = useState<boolean>(true);
  const [microphone, setMicrophone] = useState<boolean>(true);
  const [usingTrainedGesture, setUsingTrainedGesture] =
    useState<boolean>(false);
  const [webcam, setWebcam] = useState<boolean>(true);
  const [screenShare, setScreenShare] = useState<boolean>(false);
  const [chat, setChat] = useState<boolean>(false);
  const [call, setCall] = useState<boolean>(false);
  const [setting, setSetting] = useState<boolean>(true);
  const [usingAR, setUsingAR] = useState<boolean>(false);
  const [usingGesture, setUsingGesture] = useState<boolean>(false);
  const [participant, setParticipant] = useState<boolean>(false);
  const [webcamTrack, setWebcamTrack] = useState<MediaStreamTrack>();
  const [webcamDeviceId, setWebcamDeviceId] = useState<string>("");
  const [microphoneDeviceId, setMicrophoneDeviceId] = useState<string>("");
  const [webcamDevices, setWebcamDevices] = useState<MediaDeviceInfo[]>([]);
  const [microphoneDevices, setMicrophoneDevices] = useState<MediaDeviceInfo[]>(
    []
  );

  const frame = useRef(0);
  const [gesture, setGesture] = useState("");
  const [trainedGesture, setTrainedGesture] = useState("");

  const toggle = (
    type:
      | "microphone"
      | "webcam"
      | "screenShare"
      | "chat"
      | "call"
      | "setting"
      | "usingAR"
      | "usingGesture"
      | "participant"
      | "usingTrainedGesture"
  ) => {
    const param = (prevValue: boolean) => !prevValue;
    switch (type) {
      case "microphone":
        setMicrophone(param);
        break;
      case "webcam":
        setWebcam(param);
        break;
      case "call":
        setCall(param);
        break;
      case "screenShare":
        setScreenShare(param);
        break;
      case "chat":
        setChat(param);
        break;
      case "setting":
        setSetting(param);
        break;
      case "usingAR":
        setUsingAR(param);
        break;
      case "usingGesture":
        setUsingGesture(param);
        break;
      case "participant":
        setParticipant(param);
        break;
      case "usingTrainedGesture":
        setUsingTrainedGesture(param);
        break;
    }
  };

  const [name, setName] = useState("hero");
  const [roomName, setRoomName] = useState<string>();
  const [chatMessage, setChatMessage] = useState<string>("");
  const [messages, setMessages] = useState<MessageInterface[]>([]);

  const navigate = useNavigate();

  const joinRoom = (room: string, name: string) => {
    setRoomName(room);
    setName(name);
    navigate(addURLPath(`/room/${room}`));
  };

  /**
   * LeaveCall
   *
   * */
  const leaveCall = () => {
    stream?.getTracks().forEach(function (track) {
      track.stop();
    });
    navigate(-1);
  };

  const activeSpeaker = useRef<{
    producerId: string | null;
    peerId: string | null;
    volume: number | null;
  }>({ producerId: null, volume: null, peerId: null });

  // Threejs Model name
  const [modelName, setModelName] = useState("");
  type Result = {
    error?: "string";
    public_ip?: "string";
    public_dns: "string";
    server_status: "running" | "stopped" | "stopping" | "pending";
    message: "string";
  };
  const [uri, setUri] = useState("");
  const [message, setMessage] = useState("");
  const getPublicIp = async () => {
    const uri = `https://major.sahasp.com.np:3000/mediasoup`;
    setUri(uri);
    // try {
    //   const response = await fetch(
    //     "https://w9j7p3zf63.execute-api.ap-south-1.amazonaws.com/test/public-ip"
    //   );

    //   const res: Result = await response.json();
    //   console.log("Response:", res);
    //   setMessage(res.message);

    //   if (res.server_status === "running") {
    //     console.log(res);
    //     const uri = `https://${res.public_ip}:3000/mediasoup`;
    //     setUri(uri);
    //     return;
    //   } else {
    //     setTimeout(() => {
    //       getPublicIp();
    //       // navigate(0);
    //     }, 30000);
    //   }
    // } catch (err) {
    //   console.log(err);
    //   setMessage("Wait sometime for server to launch!");
    //   setTimeout(() => {
    //     // navigate(0);
    //     getPublicIp();
    //   }, 30000);
    // }
  };

  useEffect(() => {
    getPublicIp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ConferenceContext.Provider
      value={{
        stream,
        otherStreams,
        name,
        roomName,
        modelName,
        activeSpeaker,
        webcam,
        microphone,
        webcamDeviceId,
        microphoneDeviceId,
        call,
        setting,
        screenShare,
        chat,
        participant,
        usingAR,
        usingGesture,
        microphoneDevices,
        webcamDevices,
        webcamTrack,
        showCORSInfo,
        peers,
        uri,
        messages,
        chatMessage,
        setChatMessage,
        setMessages,

        message,
        gesture,
        frame,
        trainedGesture,
        usingTrainedGesture,

        setTrainedGesture,
        setUsingTrainedGesture,

        setGesture,
        setUri,
        setPeers,
        setMessage,

        setShowCORSInfo,
        setWebcamTrack,
        setModelName,
        setWebcam,
        setMicrophone,
        setParticipant,
        setWebcamDeviceId,
        setMicrophoneDeviceId,
        setCall,
        setChat,
        setScreenShare,
        setSetting,
        setUsingAR,
        setUsingGesture,
        setMicrophoneDevices,
        setWebcamDevices,
        setOtherStreams,
        setStream,
        setName,
        setRoomName,

        toggle,

        joinRoom,
        leaveCall,
      }}
    >
      {children}
    </ConferenceContext.Provider>
  );
};

export { ConferenceContextProvider, ConferenceContext };
