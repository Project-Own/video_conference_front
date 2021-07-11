/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, FC, useState } from "react";
import { useHistory } from "react-router";
import { SignalData } from "simple-peer";
import { addURLPath } from "src/utils/utils";

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
  stream: MediaStream | undefined;

  setOtherStreams: React.Dispatch<React.SetStateAction<MediaStream[]>>;
  setStream: React.Dispatch<React.SetStateAction<MediaStream | undefined>>;

  otherStreams: MediaStream[] | undefined;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  roomName: string;
  setRoomName: React.Dispatch<React.SetStateAction<string>>;

  joinRoom: () => void;
  leaveCall: () => void;
}

/**
 *
 * ContextProvider
 * */
const ContextProvider: FC = ({ children }) => {
  const [stream, setStream] = useState<MediaStream>();
  const [otherStreams, setOtherStreams] = useState<MediaStream[]>([]);
  const [name, setName] = useState("");
  const [roomName, setRoomName] = useState("");

  const history = useHistory();

  const joinRoom = () => {
    history.push(addURLPath(`/room/${roomName}`));
  };

  /**
   * LeaveCall
   *
   * */
  const leaveCall = () => {
    stream?.getTracks().forEach(function (track) {
      track.stop();
    });
    history.replace(addURLPath(`/`));
    window.location.reload();
  };
  return (
    <SocketContext.Provider
      value={{
        setOtherStreams,
        stream,
        setStream,
        otherStreams,
        name,
        setName,
        roomName,
        setRoomName,

        joinRoom,
        leaveCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
