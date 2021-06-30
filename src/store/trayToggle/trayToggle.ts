import { createSlice } from "@reduxjs/toolkit";
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
  setAr: true,
};

export const trayToggleSlice = createSlice({
  name: FeatureKey.TRAY_TOGGLE,
  initialState,
  reducers: {
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
      state.setAr = !state.setAr;
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
} = trayToggleSlice.actions;

/**
 * Selector
 * */
export const selectTrayState = (state: RootState) => state.trayToggle;

/**
 * Reducer
 * */
export const trayToggleReducer = trayToggleSlice.reducer;
