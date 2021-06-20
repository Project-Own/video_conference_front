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
    <div className={classes.root}>
      <Grid item container xs={12} className={classes.main_grid}>
        <VideoFeed />
      </Grid>

      <Grid item xs={12}>
        <Bottombar />
      </Grid>
    </div>
  );
};

export default ConferenceGridLayout;
