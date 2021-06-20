import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ContextProvider } from "./components/context/Context";
import "./index.css";
import App from "./pages/App/App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store/configureStore";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ContextProvider>
        <App />
      </ContextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
