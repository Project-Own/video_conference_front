/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, FC, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [webcam, setWebcam] = useState<boolean>(true);
  const [screenShare, setScreenShare] = useState<boolean>(false);
  const [chat, setChat] = useState<boolean>(false);
  const [call, setCall] = useState<boolean>(false);
  const [setting, setSetting] = useState<boolean>(false);
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
    }
  };

  const [name, setName] = useState("hero");
  const [roomName, setRoomName] = useState<string>();

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

        setPeers,

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
