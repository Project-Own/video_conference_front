import loadable, { LoadableComponent } from "@loadable/component";
import Toolbar from "@material-ui/core/Toolbar";
import anime from "animejs";
import { FC, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {
  Transition,
  TransitionGroup,
  TransitionStatus,
} from "react-transition-group";
import { Loading } from "src/components/Loading/Loading";
import NavigationBar from "src/components/NavigationBar/NavigaitionBar";
import { ContextProvider } from "src/pages/Context/Context";
import { addURLPath } from "src/utils/utils";

// const LoadableHost = loadable(() => import("src/components/host/Host"), {
//   fallback: <Loading />,
// });
// const LoadableCamera = loadable(
//   () => import("src/components/videoplayer/VideoPlayerCollection"),
//   {
//     fallback: <Loading />,
//   }
// );

const LoadableModel = loadable(
  () => import("src/components/ModelLoader/ModelLoader"),
  {
    fallback: <Loading />,
  }
);
const LoadableAR = loadable(
  () => import("src/components/ThreexComp/ThreexComp"),
  {
    fallback: <Loading />,
  }
);
const LoadableLanding = loadable(() => import("src/pages/Landing/Landing"), {
  fallback: <Loading />,
});
const LoadableConference = loadable(
  () => import("src/pages/Conference/Conference"),
  {
    fallback: <Loading />,
  }
);

export interface RoutePath {
  path: string;
  name: string;
  Component: LoadableComponent<unknown>;
}
const routes: RoutePath[] = [
  { path: addURLPath("/"), name: "Home", Component: LoadableLanding },
  { path: addURLPath("/ar"), name: "AR", Component: LoadableAR },
  { path: addURLPath("/model"), name: "Model", Component: LoadableModel },
  // { path: addURLPath("/about"), name: "Combine", Component: LoadableCombine },

  // { path: addURLPath("/team"), name: "Host", Component: LoadableHost },

  // {
  //   path: addURLPath("/test"),
  //   name: "Test",
  //   Component: LoadableCamera,
  // },
];
const RouterHandler = () => {
  const nodeRef = useRef(null);
  return (
    <Router>
      <ContextProvider>
        <Toolbar>
          <NavigationBar routes={routes} />
        </Toolbar>

        <TransitionGroup>
          {routes.map(({ path, Component }) => (
            <Route key={path} exact path={path}>
              {({ match }) => (
                <Transition
                  nodeRef={nodeRef}
                  in={match != null}
                  timeout={0}
                  unmountOnExit
                  mountOnEnter
                >
                  {(status) => {
                    return (
                      <TransitionComponent status={status}>
                        <Component />
                      </TransitionComponent>
                    );
                  }}
                </Transition>
              )}
            </Route>
          ))}

          <Route
            exact
            path={addURLPath("/room/:id")}
            children={<LoadableConference />}
          />
        </TransitionGroup>
      </ContextProvider>
    </Router>
  );
};

const TransitionComponent: FC<{ status: TransitionStatus }> = ({
  status,
  children,
}) => {
  const compRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    anime({
      targets: compRef.current,
      translateX: () => {
        if (status === "entering" || status === "entered") {
          return ["-100%", "0%"];
        }
      },
      translateY: () => {
        if (status === "exiting") {
          return ["0%", "100%"];
        }
      },
      elasticity: () => {
        if (status === "entering" || status === "entered") {
          return 0.1;
        } else if (status === "exiting") {
          return 0;
        }
        return 0;
      },
      opacity: () => {
        if (status === "entering" || status === "entered") {
          return [0, 1];
        } else if (status === "exiting") {
          return [1, 0];
        }
      },
      duration: 1000,
    });
  }, [status]);

  return <div ref={compRef}>{children}</div>;
};
export default RouterHandler;
