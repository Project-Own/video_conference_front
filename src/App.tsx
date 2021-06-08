import { Grid } from "@material-ui/core";
import "./App.css";
import Camera from "./components/camera/Camera";
import { Counter } from "./components/counter/Counter";
import logo from "./logo.svg";

function App() {
  return (
    <Grid container direction="column">
      <Grid item>{/* <Host /> */}</Grid>
      <Grid item xs={12}>
        <Camera />
      </Grid>
      <Grid item xs={12}>
        <Counter />
      </Grid>
      <Grid item>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              This is an example page only containing counter have fun!! Edit{" "}
              <code>src/App.tsx</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </Grid>
    </Grid>
  );
}

export default App;
