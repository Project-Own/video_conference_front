import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./store/configureStore";

test("renders learn react link", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = screen.getByText(/home/i);
  expect(linkElement).toBeInTheDocument();
});
