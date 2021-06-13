import loadable from "@loadable/component";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import "./App.css";
import { Loading } from "./components/Loading/Loading";
import { addURLPath } from "./utils/utils";

const LoadableHost = loadable(() => import("./components/host/Host"), {
  fallback: <Loading />,
});

const LoadableCamera = loadable(() => import("./components/camera/Camera"), {
  fallback: <Loading />,
});

const LoadableCounter = loadable(() => import("./components/counter/Counter"), {
  resolveComponent: (component) => component.Counter,
  fallback: <Loading />,
});
function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to={addURLPath("/")}>Home</Link>
            </li>
            <li>
              <Link to={addURLPath("/about")}>About</Link>
            </li>
            <li>
              <Link to={addURLPath("/team")}>Teams</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path={addURLPath("/")}>
            <LoadableCamera />
          </Route>
          <Route path={addURLPath("/about")}>
            <LoadableHost />
          </Route>
          <Route path={addURLPath("/team")}>
            {/* <div>ello</div> */}
            <LoadableCounter />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
