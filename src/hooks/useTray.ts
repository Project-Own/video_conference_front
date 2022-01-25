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
  State2,
  setWebcamDeviceID,
  setMicrophoneDeviceID,
  setWebcamDevices,
  setMicrophoneDevices,
  toggleGesture,
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
  usingGesture: boolean;
  webcamDeviceID: string;
  microphoneDeviceID: string;
  webcamDevices: MediaDeviceInfo[];
  microphoneDevices: MediaDeviceInfo[];
  toggleCall: () => void;
  toggleChat: () => void;
  toggleMicrophone: () => void;
  toggleParticipant: () => void;
  toggleScreenShare: () => void;
  toggleWebcam: () => void;
  toggleSetting: () => void;
  toggleAr: () => void;
  toggleGesture: () => void;
  setState: (state: State) => void;
  setWebcamDeviceID: (state: State2) => void;
  setMicrophoneDeviceID: (state: State2) => void;
  setMicrophoneDevices: (devices: MediaDeviceInfo[]) => void;
  setWebcamDevices: (devices: MediaDeviceInfo[]) => void;
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
    usingGesture: trayState.usingGesture,
    webcamDeviceID: trayState.webcamDeviceID,
    microphoneDeviceID: trayState.microphoneDeviceID,
    webcamDevices: trayState.webcamDevices,
    microphoneDevices: trayState.microphoneDevices,
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
    toggleGesture: useCallback(() => dispatch(toggleGesture()), [dispatch]),
    setState: useCallback(
      (state: State) => dispatch(setState(state)),
      [dispatch]
    ),
    setWebcamDeviceID: useCallback(
      (state: State2) => dispatch(setWebcamDeviceID(state)),
      [dispatch]
    ),
    setMicrophoneDeviceID: useCallback(
      (state: State2) => dispatch(setMicrophoneDeviceID(state)),
      [dispatch]
    ),
    setMicrophoneDevices: useCallback(
      (devices: MediaDeviceInfo[]) => dispatch(setMicrophoneDevices(devices)),
      [dispatch]
    ),
    setWebcamDevices: useCallback(
      (devices: MediaDeviceInfo[]) => dispatch(setWebcamDevices(devices)),
      [dispatch]
    ),
  };
};
