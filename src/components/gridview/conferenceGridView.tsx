// import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { useContext } from "react";
import BottomBar from "../BottomComponents/Bottombar";
import { SocketContext } from "../context/Context";
import VideoFeed from "./VideoFeed";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // flexGrow: 1,
      // height: "100vh",
      height: "100%",
      minHeight: "100%",
      background: "red",
      position: "relative",
    },
    main_grid: {
      // height: "80vh",
      display: "flex",
      flexFlow: "row wrap",
      flex: 1,
      background: "blue",
    },
  })
);

const ConferenceGridLayout = () => {
  const classes = useStyles();
  const context = useContext(SocketContext);
  const {
    // name, callAccepted, callEnded,
    stream,
    // otherStreams,
    //  , call
  } = context;
  return (
    <Grid container direction="column" className={classes.root}>
      <Grid item container xs={12} className={classes.main_grid}>
        <VideoFeed />
      </Grid>

      <BottomBar />
    </Grid>
  );
};

export default ConferenceGridLayout;
