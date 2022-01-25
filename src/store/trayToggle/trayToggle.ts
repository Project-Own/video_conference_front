import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../reducers";
import { FeatureKey } from "./../featureKey";

const initialState = {
  microphone: false,
  webcam: false,
  screenShare: false,
  chat: false,
  participant: false,
  call: false,
  setting: false,
  usingAR: false,
  usingGesture: false,
  webcamDeviceID: "",
  microphoneDeviceID: "",
  webcamDevices: [] as MediaDeviceInfo[],
  microphoneDevices: [] as MediaDeviceInfo[],
};
export interface State {
  type:
    | "microphone"
    | "webcam"
    | "screenShare"
    | "chat"
    | "participant"
    | "call"
    | "setting"
    | "usingAR"
    | "usingGesture";
  value: boolean;
}
export interface State2 {
  value: string;
}
export interface State3 {
  value: MediaDeviceInfo[];
}
export const trayToggleSlice = createSlice({
  name: FeatureKey.TRAY_TOGGLE,
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<State>) => {
      state[action.payload.type] = action.payload.value;
    },
    toggleChat: (state) => {
      state.chat = !state.chat;
    },
    toggleCall: (state) => {
      state.call = !state.call;
    },
    toggleParticipant: (state) => {
      state.participant = !state.participant;
    },
    toggleMicrophone: (state) => {
      state.microphone = !state.microphone;
    },
    toggleScreenShare: (state) => {
      state.screenShare = !state.screenShare;
    },
    toggleWebcam: (state) => {
      state.webcam = !state.webcam;
    },
    toggleSetting: (state) => {
      state.setting = !state.setting;
    },
    toggleAr: (state) => {
      state.usingAR = !state.usingAR;
    },
    toggleGesture: (state) => {
      state.usingGesture = !state.usingGesture;
    },
    setWebcamDeviceID: (state, action: PayloadAction<State2>) => {
      state.webcamDeviceID = action.payload.value;
    },
    setMicrophoneDeviceID: (state, action: PayloadAction<State2>) => {
      state.microphoneDeviceID = action.payload.value;
    },
    setMicrophoneDevices: (state, action: PayloadAction<MediaDeviceInfo[]>) => {
      state.microphoneDevices = action.payload;
    },
    setWebcamDevices: (state, action: PayloadAction<MediaDeviceInfo[]>) => {
      state.webcamDevices = action.payload;
    },
  },
});

/**
 * Actions
 * */
export const {
  toggleCall,
  toggleChat,
  toggleMicrophone,
  toggleParticipant,
  toggleScreenShare,
  toggleWebcam,
  toggleSetting,
  toggleAr,
  setWebcamDeviceID,
  setMicrophoneDeviceID,
  setMicrophoneDevices,
  setWebcamDevices,
  setState,
  toggleGesture,
} = trayToggleSlice.actions;

/**
 * Selector
 * */
export const selectTrayState = (state: RootState) => state.trayToggle;

/**
 * Reducer
 * */
export const trayToggleReducer = trayToggleSlice.reducer;
