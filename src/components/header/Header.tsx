import loadable from "@loadable/component";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import anime from "animejs";
import { FC, useEffect, useRef } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import {
  Transition,
  TransitionGroup,
  TransitionStatus,
} from "react-transition-group";
import { addURLPath } from "../../utils/utils";
import Hamburger from "../Hamburger/Hamburger";
import { Loading } from "../Loading/Loading";

const LoadableHost = loadable(() => import("../host/Host"), {
  fallback: <Loading />,
});
const LoadableLanding = loadable(() => import("src/pages/Landing/Landing"), {
  fallback: <Loading />,
});
const LoadableCombine = loadable(
  () => import("src/components/Combine/combine"),
  {
    fallback: <Loading />,
  }
);

const routes = [
  { path: addURLPath("/"), name: "Home", Component: LoadableLanding },
  { path: addURLPath("/about"), name: "Home", Component: LoadableCombine },

  { path: addURLPath("/team"), name: "Home", Component: LoadableHost },
];
const Header = () => {
  const nodeRef = useRef(null);
  return (
    <Router>
      <div>
        <Toolbar>
          <Grid container direction="row-reverse">
            <Grid item xs={1}>
              <Hamburger
                height="24"
                width="24"
                stroke="blue"
                strokeWidth="3"
                toggle={() => {}}
              />
            </Grid>

            <Grid item xs={1}>
              <Typography variant="h6">
                <Link to={addURLPath("/team")}>Team</Link>
              </Typography>
            </Grid>

            <Grid item xs={1}>
              <Typography variant="h6">
                <Link to={addURLPath("/about")}>About</Link>
              </Typography>
            </Grid>

            <Grid item xs={1}>
              <Typography variant="h6">
                <Link to={addURLPath("/")}>Home</Link>
              </Typography>
            </Grid>
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
        // else if (status === "exiting") {
        //   return ["0%", "100%"];
        // }
      },
      elasticity: () => {
        if (status === "entering" || status === "entered") {
          return 300;
        }
        // else if (status === "exiting") {
        //   return 0;
        // }
        return 0;
      },
      duration: 1000,
    });
  }, [status]);

  return <div ref={compRef}>{children}</div>;
};
export default Header;
