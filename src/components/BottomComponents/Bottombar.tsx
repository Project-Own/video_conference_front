import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
import { useState } from "react";
import ButtonTray from "./ButtonTray";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bottom_bar: {
      background: "#EDEDEDd",
      // height: "12vh",
      bottom: 0,
      overflow: "auto",
      position: "fixed",
      alignItems: "center",
      // padding: theme.spacing(2),
    },

    ar_button: {
      width: "160px",
      height: "54px",
      // position: "absolute",
      // left: "80px",
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
    <Grid
      container
      item
      xs={12}
      direction="row"
      className={classes.bottom_bar}
      spacing={2}
      justify="center"
      alignItems="center"
    >
      {isHost ? (
        <Grid item md={2}>
          <Button onClick={() => ar_button()} className={classes.ar_button}>
            <Typography className={classes.text}>
              {ar_text ? "Start AR" : "Stop AR"}
            </Typography>
          </Button>
        </Grid>
      ) : null}
      <ButtonTray />
    </Grid>
  );
};

export default BottomBar;
