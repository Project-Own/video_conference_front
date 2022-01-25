import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { useTray } from "../../hooks/useTray";
import ButtonTray from "./ButtonTray";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bottom_bar: {
      background: "#EDEDEDd",
      // height: "12vh",
      bottom: 20,
      // overflow: "auto",
      position: "fixed",
      alignItems: "center",
      padding: theme.spacing(2),
      zIndex: 10,
    },

    ar_button: {
      width: "100%",
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
    // bottom_bar: {
    //   // background: "#EDEDEDd",
    //   background: "green",
    //   height: "80px",
    //   overflow: "auto",
    //   // position: "absolute",
    //   // bottom: "-90px",
    //   // left: 0,
    //   // bottom: "80px",
    //   // marginTop: "0px",
    //   alignItems: "center",
    // },
  })
);

const BottomBar = () => {
  const { usingAR, toggleAr, usingGesture, toggleGesture } = useTray();
  const isHost = true;
  // const [ar_text, usingAR_text] = useState(false);
  const classes = useStyles();
  // const ar_button = () => {
  //   usingAR_text(!ar_text);
  // };

  return (
    <Grid
      container
      item
      xs={12}
      direction="row"
      className={classes.bottom_bar}
      spacing={4}
      justify="center"
      alignItems="center"
    >
      {isHost ? (
        <>
          <Grid item md={2}>
            <Button onClick={toggleAr} className={classes.ar_button}>
              <Typography className={classes.text}>
                {usingAR ? "Stop AR" : "Start AR"}
              </Typography>
            </Button>
          </Grid>
          <Grid item md={2}>
            <Button onClick={toggleGesture} className={classes.ar_button}>
              <Typography className={classes.text}>
                {usingGesture ? "Stop Gesture" : "Start Gesture"}
              </Typography>
            </Button>
          </Grid>
        </>
      ) : null}
      <ButtonTray />
    </Grid>
  );
};

export default BottomBar;
