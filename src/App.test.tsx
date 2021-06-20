import { render } from "@testing-library/react";
// import { screem } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { rootReducer as reducers } from "../src/store/reducers";
import App from "./App";
import { store } from "./store/configureStore";

test("reducers", () => {
  let state;
  state = reducers(
    {
      todo: { ids: [], entities: {}, isFetching: false, selectedId: null },
      counter: { value: 0, status: "idle" },
      trayToggle: {
        microphone: false,
        webcam: true,
        screenShare: false,
        chat: false,
        participant: false,
        call: false,
        setting: false,
      },
    },
    { type: "TRAY_TOGGLE/toggleParticipant" }
  );
  expect(state).toEqual({
    todo: { ids: [], entities: {}, isFetching: false, selectedId: null },
    counter: { value: 0, status: "idle" },
    trayToggle: {
      microphone: false,
      webcam: true,
      screenShare: false,
      chat: false,
      participant: true,
      call: false,
      setting: false,
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
