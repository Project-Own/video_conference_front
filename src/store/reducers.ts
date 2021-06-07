import { combineReducers } from "redux";
import { counterReducer } from "./counter/counter";
import { todoReducer } from "./todo/reducer";

export const rootReducer = combineReducers({
  todo: todoReducer,
  counter: counterReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
