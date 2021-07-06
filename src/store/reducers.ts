import { combineReducers } from "redux";
import { counterReducer } from "./counter/counter";
import { trayToggleReducer } from "./trayToggle";

export const rootReducer = combineReducers({
  counter: counterReducer,
  trayToggle: trayToggleReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
