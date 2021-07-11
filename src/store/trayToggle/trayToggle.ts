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
    | "usingAR";
  value: boolean;
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
  setState,
} = trayToggleSlice.actions;

/**
 * Selector
 * */
export const selectTrayState = (state: RootState) => state.trayToggle;

/**
 * Reducer
 * */
export const trayToggleReducer = trayToggleSlice.reducer;
