// import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { default as Bottombar } from "../BottomComponents/Bottombar";
import VideoFeed from "./VideoFeed";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    main_grid: {
      height: "88vh",
      display: "flex",
      flexFlow: "row wrap",
    },
  })
);

const ConferenceGridLayout = () => {
  const classes = useStyles();

  return (
    <Grid container direction="row" alignItems="center" justify="center">
      <Grid
        item
        container
        xs={2}
        // className={classes.main_grid}
      >
        <VideoFeed />
      </Grid>

      <Grid item container>
        <Bottombar />
      </Grid>
    </Grid>
  );
};

export default ConferenceGridLayout;
