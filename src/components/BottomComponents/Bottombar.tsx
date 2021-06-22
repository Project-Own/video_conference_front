import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
import { useState } from "react";
import ButtonTray from "./ButtonTray";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ar_button: {
      width: "100%",
      height: "54px",
      // position: "absolute",
      left: "80px",
      background: "#2F4F4F",
      borderRadius: "16px",
      alignItems: "center",
      "&:hover": {
        color: "black",
        background: "#097969",
      },
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
    bottom_bar: {
      // background: "#EDEDEDd",
      background: "green",
      height: "80px",
      overflow: "auto",
      // position: "absolute",
      // bottom: "-90px",
      // left: 0,
      // bottom: "80px",
      // marginTop: "0px",
      alignItems: "center",
    },
  })
);

const BottomBar = () => {
  const isHost = true;
  const [ar_text, setar_text] = useState(false);
  const classes = useStyles();
  const ar_button = () => {
    setar_text(!ar_text);
  };

  return (
    // <Grid container className={classes.bottom_bar}>

    <Grid container direction="column" className={classes.bottom_bar}>
      <Grid xs={2} style={{ background: "white" }}>
        {isHost && (
          <Button onClick={() => ar_button()} className={classes.ar_button}>
            <Typography className={classes.text}>
              {ar_text ? "Start AR" : "Stop AR"}
            </Typography>
          </Button>
        )}
      </Grid>

      <ButtonTray />
    </Grid>
  );
};

export default BottomBar;
