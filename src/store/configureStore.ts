import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { rootReducer, RootState } from "./reducers";

// const middlewares = [...getDefaultMiddleware<RootState>()];

export const store = configureStore({
  reducer: rootReducer,
  // middleware: middlewares,
  devTools: process.env.NODE_ENV === "development",
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
