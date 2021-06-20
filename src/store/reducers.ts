import { combineReducers } from "redux";
import { counterReducer } from "./counter/counter";
import { todoReducer } from "./todo/reducer";
import { trayToggleReducer } from "./trayToggle";

export const rootReducer = combineReducers({
  todo: todoReducer,
  counter: counterReducer,
  trayToggle: trayToggleReducer
});

export type RootState = ReturnType<typeof rootReducer>;
