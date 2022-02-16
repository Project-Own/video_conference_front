import Layout from "src/components/Layout/Layout";
import "./transition.css";
import { addURLPath } from "src/utils/utils";
import Conference from "./Conference/Conference";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
const Home = lazy(() => import("./Home/Home"));

export interface RoutePath {
  path: string;
  name: string;
  Component: JSX.Element;
}
export const routes: RoutePath[] = [
  { path: addURLPath("/"), name: "Home", Component: <Home /> },
];

const PageRoutes = () => {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes location={location}>
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
      </CSSTransition>
    </TransitionGroup>
  );
};

export default PageRoutes;
