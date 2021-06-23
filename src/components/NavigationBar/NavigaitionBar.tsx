import { Grid, Typography } from "@material-ui/core";
import anime from "animejs";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RoutePath } from "src/pages/Router/Router";
import Hamburger from "src/components/Hamburger/Hamburger";

const NavigationBar: FC<{ routes: RoutePath[] }> = ({ routes }) => {
  const [list, setList] = useState(false);
  const [hidden, setHidden] = useState(true);

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

  return (
    <Grid
      container
      item
      direction="row"
      alignItems="center"
      justify="flex-end"
      spacing={2}
    >
      {routes.map(({ name, path }) => (
        <Grid item hidden={hidden} key={path}>
          <Typography variant="h6" className="list">
            <Link to={path}>{name}</Link>
          </Typography>
        </Grid>
      ))}
      <Grid item xs={1}>
        <Hamburger
          height="24"
          width="24"
          stroke="blue"
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
