import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import ButtonTray from "./ButtonTray";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bottom_bar: {
      background: "#EDEDEDd",
      height: "12vh",
      overflow: "auto",
      position: "relative",
      alignItems: "center",
    },

    ar_button: {
      width: "160px",
      height: "54px",
      position: "absolute",
      left: "80px",
      background: "#2F4F4F",
      borderRadius: "16px",
      alignItems: "center",
    },
    text: {
      fontFamily: "Noto Sans JP",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "26px",
      lineHeight: "52px",
      textAlign: "center",

      color: "#A4A4A4",
    },
  })
);

const VideoFeed = () => {
  const [isHost, setisHost] = useState(true);
  const classes = useStyles();
  return (
    <Grid container className={classes.bottom_bar}>
      {isHost ? (
        <>
          <Button className={classes.ar_button}>
            <Typography className={classes.text}>Start AR</Typography>
          </Button>
        </>
      ) : (
        <>
          <div className={classes.ar_button}>
            <Typography className={classes.text}>Welcome</Typography>
          </div>
        </>
      )}
      <ButtonTray />
    </Grid>
  );
};

export default VideoFeed;
