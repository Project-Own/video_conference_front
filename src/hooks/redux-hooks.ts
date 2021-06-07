import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "./../store/configureStore";
import { RootState } from "./../store/reducers";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
