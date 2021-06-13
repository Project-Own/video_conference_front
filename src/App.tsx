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
            {/* <div className="App">
              <Host />
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  This is an example page only containing counter have fun!!
                  Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                  className="App-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn React
                </a>
                <Counter />
              </header>
            </div> */}
            <Counter />
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
