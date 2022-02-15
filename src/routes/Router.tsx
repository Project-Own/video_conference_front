import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { lazy, Suspense, useContext, useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "src/components/Layout/Layout";
import { ConferenceContextProvider } from "src/context/ConferenceContext";
import { UIContext } from "src/context/UIContext";

import { addURLPath } from "src/utils/utils";
import Conference from "./Conference/Conference";

const Home = lazy(() => import("./Home/Home"));
export interface RoutePath {
  path: string;
  name: string;
  Component: JSX.Element;
}
export const routes: RoutePath[] = [
  { path: addURLPath("/"), name: "Home", Component: <Home /> },
  { path: addURLPath("/s"), name: "Home", Component: <div>sd </div> },
];

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
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={<Layout>{route.Component} </Layout>}
                ></Route>
              ))}
              <Route path={addURLPath("/room/:id")} element={<Conference />} />
            </Routes>
          </Suspense>
        </ThemeProvider>
      </ConferenceContextProvider>
    </BrowserRouter>
  );
};

export default Router;
