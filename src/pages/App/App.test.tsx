import { render } from "@testing-library/react";
// import { screem } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { store } from "src/store/configureStore";
import { rootReducer as reducers } from "../../store/reducers";
import App from "./App";

test("reducers", () => {
  let state;
  state = reducers(
    {
      counter: { value: 0, status: "idle" },
      trayToggle: {
        microphone: false,
        webcam: true,
        screenShare: false,
        chat: false,
        participant: false,
        call: false,
        setting: false,
        usingAR: false,
      },
    },
    { type: "TRAY_TOGGLE/toggleParticipant" }
  );
  expect(state).toEqual({
    counter: { value: 0, status: "idle" },
    trayToggle: {
      microphone: false,
      webcam: true,
      screenShare: false,
      chat: false,
      participant: true,
      call: false,
      setting: false,
      usingAR: false,
    },
  });
});

test("renders learn react link", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});
