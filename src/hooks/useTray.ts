import { useCallback } from "react";
import {
  selectTrayState,
  setState,
  toggleAr,
  toggleCall,
  toggleChat,
  toggleMicrophone,
  toggleParticipant,
  toggleScreenShare,
  toggleSetting,
  toggleWebcam,
  State,
} from "./../store/trayToggle/trayToggle";
import { useAppDispatch, useAppSelector } from "./redux-hooks";

type TrayOperators = {
  microphone: boolean;
  webcam: boolean;
  screenShare: boolean;
  chat: boolean;
  participant: boolean;
  call: boolean;
  setting: boolean;
  usingAR: boolean;

  toggleCall: () => void;
  toggleChat: () => void;
  toggleMicrophone: () => void;
  toggleParticipant: () => void;
  toggleScreenShare: () => void;
  toggleWebcam: () => void;
  toggleSetting: () => void;
  toggleAr: () => void;
  setState: (state: State) => void;
};

export const useTray = (): Readonly<TrayOperators> => {
  const dispatch = useAppDispatch();
  const trayState = useAppSelector(selectTrayState);

  return {
    microphone: trayState.microphone,
    webcam: trayState.webcam,
    screenShare: trayState.screenShare,
    chat: trayState.chat,
    participant: trayState.participant,
    call: trayState.call,
    setting: trayState.setting,
    usingAR: trayState.usingAR,
    toggleCall: useCallback(() => dispatch(toggleCall()), [dispatch]),
    toggleChat: useCallback(() => dispatch(toggleChat()), [dispatch]),
    toggleMicrophone: useCallback(
      () => dispatch(toggleMicrophone()),
      [dispatch]
    ),
    toggleParticipant: useCallback(
      () => dispatch(toggleParticipant()),
      [dispatch]
    ),
    toggleScreenShare: useCallback(
      () => dispatch(toggleScreenShare()),
      [dispatch]
    ),
    toggleWebcam: useCallback(() => dispatch(toggleWebcam()), [dispatch]),
    toggleSetting: useCallback(() => dispatch(toggleSetting()), [dispatch]),
    toggleAr: useCallback(() => dispatch(toggleAr()), [dispatch]),
    setState: useCallback(
      (state: State) => dispatch(setState(state)),
      [dispatch]
    ),
  };
};
