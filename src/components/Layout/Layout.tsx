import { Paper, Toolbar } from "@mui/material";
import { FC } from "react";
import { routes } from "src/routes/Router";
import NavigationBar from "src/components/Layout/NavigationBar/NavigationBar";
import { ErrorBoundary } from "../ErrorBoundary/ErrorBoundary";

const Layout: FC = ({ children }) => {
  return (
    <Paper sx={{ height: "100%", width: "100%" }}>
      <ErrorBoundary>
        <Toolbar>
          <NavigationBar routes={routes} />
        </Toolbar>
        {children}
      </ErrorBoundary>
    </Paper>
  );
};
export default Layout;
