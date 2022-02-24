import { FC } from "react";
import { UIContextProvider } from "./context/UIContext";
import Router from "./routes/Router";

const App: FC = () => {
  return (
    <UIContextProvider>
      <Router />
    </UIContextProvider>
  );
};
export default App;
