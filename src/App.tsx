import React from "react";
import "./App.css";
import { Counter } from "./components/counter/Counter";
import SignIn from "./components/host/host";
import logo from "./logo.svg";

function App() {
  return (
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
        <Counter />
        <SignIn />
      </header>
    </div>
  );
}

export default App;
