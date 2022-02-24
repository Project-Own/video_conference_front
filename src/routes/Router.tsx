import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useContext, useMemo } from "react";
import { BrowserRouter } from "react-router-dom";
import { ConferenceContextProvider } from "src/context/ConferenceContext";
import { UIContext } from "src/context/UIContext";
import PageRoutes from "./PageRoutes";

const Router = () => {
  const { themeMode } = useContext(UIContext);
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
        },
      }),
    [themeMode]
  );

  return (
    <BrowserRouter>
      <ConferenceContextProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <PageRoutes />
        </ThemeProvider>
      </ConferenceContextProvider>
    </BrowserRouter>
  );
};

export default Router;
