import { render } from "@testing-library/react";
// import { screem } from "@testing-library/react";

import React from "react";
import { Provider } from "react-redux";
import { store } from "src/store/configureStore";
import App from "./App";

test("renders learn react link", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  // const linkElement = screen.getByText(/home/i);
  // expect(linkElement).toBeInTheDocument();
});
