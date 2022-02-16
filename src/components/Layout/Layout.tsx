import { Paper, Toolbar } from "@mui/material";
import { FC } from "react";
import { routes } from "src/routes/PageRoutes";
import NavigationBar from "src/components/Layout/NavigationBar/NavigationBar";
import { ErrorBoundary } from "../ErrorBoundary/ErrorBoundary";

const Layout: FC = ({ children }) => {
  return (
    <ErrorBoundary>
      <Paper sx={{ height: "100%", width: "100%" }}>
        <Toolbar>
          <NavigationBar routes={routes} />
        </Toolbar>
        {children}
      </Paper>
    </ErrorBoundary>
  );
};
export default Layout;
