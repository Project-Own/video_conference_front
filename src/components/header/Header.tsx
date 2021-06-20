import loadable, { LoadableComponent } from "@loadable/component";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import anime from "animejs";
import { FC, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {
  Transition,
  TransitionGroup,
  TransitionStatus,
} from "react-transition-group";
import { addURLPath } from "../../utils/utils";
import { Loading } from "../Loading/Loading";
import NavigationBar from "../NavigationBar/NavigaitionBar";

const LoadableHost = loadable(() => import("../host/Host"), {
  fallback: <Loading />,
});
const LoadableLanding = loadable(() => import("src/pages/Landing/Landing"), {
  fallback: <Loading />,
});
const LoadableCamera = loadable(() => import("src/components/camera/Camera"), {
  fallback: <Loading />,
});
const LoadableCombine = loadable(
  () => import("src/components/Combine/combine"),
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
  { path: addURLPath("/about"), name: "Home", Component: LoadableCombine },

  { path: addURLPath("/team"), name: "Home", Component: LoadableHost },
  {
    path: addURLPath("/camera"),
    name: "Camera man of the season",
    Component: LoadableCamera,
  },
];
const Header = () => {
  const nodeRef = useRef(null);
  return (
    <Router>
      <div>
        <Toolbar>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="flex-end"
            xs={12}
          >
            <NavigationBar routes={routes} />

            {/* {routes.map(({ name, path }) => (
              <Grid item xs={1}>
                <Typography variant="h6">
                  <Link to={path}>{name}</Link>
                </Typography>
              </Grid>
            ))} */}
          </Grid>
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
        </TransitionGroup>
      </div>
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
export default Header;
