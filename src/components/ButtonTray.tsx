import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";

import Grid from "@material-ui/core/Grid";
// import Icon from "@material-ui/core/Icon";
import VideocamOutlinedIcon from "@material-ui/icons/VideocamOutlined";
// import VideocamOffOutlinedIcon from "@material-ui/icons/VideocamOffOutlined";
import MicIcon from "@material-ui/icons/Mic";
// import MicOffIcon from "@material-ui/icons/MicOff";
import CallEndIcon from "@material-ui/icons/CallEnd";
import ScreenShareOutlinedIcon from "@material-ui/icons/ScreenShareOutlined";
// import StopScreenShareOutlinedIcon from "@material-ui/icons/StopScreenShareOutlined";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import PeopleAltRoundedIcon from "@material-ui/icons/PeopleAltRounded";
import SettingsIcon from "@material-ui/icons/Settings";

import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttons: {
      maxheight: "44px",
      minWidth: "44px",
      minHeight: "44px",
      maxWidth: "44px",
      background: "#FFFFFF",
      boxShadow: "0px 4px 6px 2px rgba(0, 0, 0, 0.30)",
      mixBlendMode: "overlay",
      borderRadius: "14px",
    },
    button_tray_left: {
      background: "#2F4F4F",
      borderRadius: "16px 0px 0px 16px",
      width: "140px",
      position: "absolute",
      height: "56px",
      left: "605px",
      alignItems: "center",
      zIndex: 1,

      paddingRight: "14px",
      justifyContent: "space-around",
    },
    end_call: {
      maxheight: "72px",
      minWidth: "72px",
      minHeight: "72px",
      maxWidth: "72px",
      background: "#cb2020",
      borderRadius: "40px",
      boxShadow: "0px 4px 6px 2px rgba(0, 0, 0, 0.30)",
      position: "absolute",
      height: "56px",
      left: "732px",
      zIndex: 2,
    },
    button_tray_right: {
      background: "#2F4F4F",
      borderRadius: "0px 16px 16px 0px",
      width: "280px",
      position: "absolute",
      height: "56px",
      left: "791px",
      alignItems: "center",
      zIndex: 1,
      paddingLeft: "14px",
      justifyContent: "space-around",
    },
  })
);

const ButtonTray = () => {
  const classes = useStyles();
  return (
    <Grid item container style={{ alignItems: "center" }}>
      <Grid container className={classes.button_tray_left}>
        <Button className={classes.buttons}>
          <VideocamOutlinedIcon />
        </Button>
        <Button className={classes.buttons}>
          <MicIcon />
        </Button>
      </Grid>

      <Button className={classes.end_call}>
        <CallEndIcon />
      </Button>

      <Grid container className={classes.button_tray_right}>
        <Button className={classes.buttons}>
          <ScreenShareOutlinedIcon />
        </Button>
        <Button className={classes.buttons}>
          <ChatOutlinedIcon />
        </Button>
        <Button className={classes.buttons}>
          <PeopleAltRoundedIcon />
        </Button>
        <Button className={classes.buttons}>
          <SettingsIcon />
        </Button>
      </Grid>
    </Grid>
  );
};

export default ButtonTray;
