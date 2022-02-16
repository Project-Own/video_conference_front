import { DarkMode, LightMode } from "@mui/icons-material";
import { Grid, IconButton, Typography, useTheme, Link } from "@mui/material";
import anime from "animejs";
import { FC, useContext, useEffect, useState } from "react";

import Hamburger from "src/components/Layout/Hamburger/Hamburger";
import { UIContext } from "src/context/UIContext";
import { RoutePath } from "src/routes/PageRoutes";

const NavigationBar: FC<{ routes: RoutePath[] }> = ({ routes }) => {
  const [list, setList] = useState(false);
  const [hidden, setHidden] = useState(true);
  const { themeMode, toggleThemeMode } = useContext(UIContext);
  useEffect(() => {
    if (list) {
      setHidden(false);

      anime({
        targets: ".list",
        // easing: "easeInOutSine",

        translateX: [20, 0],

        opacity: [0, 1],

        delay: anime.stagger(200, { direction: "reverse" }),
        direction: "normal",
      });
    } else {
      setTimeout(() => setHidden(true), 400);

      anime({
        targets: ".list",
        // easing: "easeInOutSine",

        translateX: 20,

        opacity: 0,
        delay: anime.stagger(100, { direction: "normal" }),
        direction: "normal",
      });
    }
  }, [list]);
  const theme = useTheme();
  return (
    <Grid
      container
      item
      xs={12}
      direction="row"
      alignItems="center"
      justifyContent="flex-end"
      spacing={2}
    >
      {routes.map(({ name, path }) => (
        <Grid item hidden={hidden} key={path}>
          <Typography variant="h6" className="list">
            <Link href={path}>{name}</Link>
          </Typography>
        </Grid>
      ))}
      <Grid item>
        <IconButton onClick={toggleThemeMode}>
          {themeMode === "light" ? <DarkMode /> : <LightMode />}
        </IconButton>
      </Grid>
      <Grid item xs={1}>
        <Hamburger
          height="24"
          width="24"
          stroke={theme.palette.primary.dark}
          strokeWidth="3"
          toggle={() => {
            if (list) {
              setList(false);
            } else {
              setList(true);
            }
          }}
        />
      </Grid>
    </Grid>
  );
};

export default NavigationBar;
