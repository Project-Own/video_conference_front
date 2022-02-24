/* eslint-disable @typescript-eslint/no-unused-vars */
import { PaletteMode, useMediaQuery } from "@mui/material";
import React, { createContext, FC, useMemo, useState } from "react";

const UIContext = createContext<UIContextProps>(undefined!);

// interface CallProps {
//   isReceivingCall: boolean;
//   from: string;
//   name: string;
//   signal: SignalData;
// }
/**
 * Props
 * */
interface UIContextProps {
  themeMode: PaletteMode;

  toggleThemeMode: () => void;
}

/**
 *
 * UIContextProvider
 * */
const UIContextProvider: FC = ({ children }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const [themeMode, setThemeMode] = useState<PaletteMode>(
    prefersDarkMode ? "dark" : "light"
  );
  useMemo(
    () => setThemeMode(prefersDarkMode ? "dark" : "light"),
    [prefersDarkMode]
  );
  const toggleThemeMode = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <UIContext.Provider
      value={{
        themeMode,

        toggleThemeMode,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export { UIContextProvider, UIContext };
