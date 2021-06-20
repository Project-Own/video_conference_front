import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { SocketContext } from "../context/Context";

const useStyles = makeStyles((theme) => ({
  video: {
    width: "550px",
    [theme.breakpoints.down("xs")]: {
      width: "300px",
    },
  },
  gridContainer: {
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  paper: {
    padding: "10px",
    border: "2px solid black",
    margin: "10px",
  },
}));

const VideoPlayer = () => {
  const context = useContext(SocketContext);

  const classes = useStyles();

  return (
    <Grid container className={classes.gridContainer}>
      {context?.stream && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {context?.name || "Name"}
            </Typography>
            <video
              playsInline
              muted
              ref={context?.myVideo}
              autoPlay
              className={classes.video}
            />
          </Grid>
        </Paper>
      )}
      {context?.callAccepted && !context?.callEnded && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {context?.call?.name || "Name"}
            </Typography>
            <video
              playsInline
              ref={context?.userVideo}
              autoPlay
              className={classes.video}
            />
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoPlayer;