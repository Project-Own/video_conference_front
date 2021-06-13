import loadable from "@loadable/component";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import "./App.css";
import Camera from "./components/camera/Camera";
import { Counter } from "./components/counter/Counter";
import { Loading } from "./components/Loading/Loading";
import { addURLPath } from "./utils/utils";

const LoadableHost = loadable(() => import("./components/host/Host"), {
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
            <Camera />
          </Route>
          <Route path={addURLPath("/about")}>
            <LoadableHost />
          </Route>
          <Route path={addURLPath("/team")}>
            {/* <div>ello</div> */}
            <Counter />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
