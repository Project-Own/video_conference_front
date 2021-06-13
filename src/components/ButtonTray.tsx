// import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import MicOffIcon from "@material-ui/icons/MicOff";
import CallEndIcon from "@material-ui/icons/CallEnd";
import VideocamOffOutlinedIcon from "@material-ui/icons/VideocamOffOutlined";
import MicIcon from "@material-ui/icons/Mic";
import PeopleAltRoundedIcon from "@material-ui/icons/PeopleAltRounded";
import ScreenShareOutlinedIcon from "@material-ui/icons/ScreenShareOutlined";
import StopScreenShareOutlinedIcon from "@material-ui/icons/StopScreenShareOutlined";
import SettingsIcon from "@material-ui/icons/Settings";
import VideocamOutlinedIcon from "@material-ui/icons/VideocamOutlined";
import ChatRoundedIcon from "@material-ui/icons/ChatRounded";
import SpeakerNotesOffRoundedIcon from "@material-ui/icons/SpeakerNotesOffRounded";
import ButtonInfo from "./ButtonInfo";

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
      "&:hover": {
        color: "white",
      },
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
      "&:hover": {
        color: "white",
        background: "#8b0000",
      },
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
  // const [on, seton] = useState(false);
  const icons_list_left = [
    {
      name: "videoIcon",
      icon: {
        active: VideocamOutlinedIcon,
        passive: VideocamOffOutlinedIcon,
      },
      handleActiveToggle: () => {},
      handlePassiveToggle: () => {},
    },
    {
      name: "micIcon",
      icon: {
        active: MicIcon,
        passive: MicOffIcon,
      },
      handleActiveToggle: () => {},
      handlePassiveToggle: () => {},
    },
  ];

  const icons_list_right = [
    {
      name: "screenShareIcon",
      icon: {
        active: ScreenShareOutlinedIcon,
        passive: StopScreenShareOutlinedIcon,
      },
      handleActiveToggle: () => {},
      handlePassiveToggle: () => {},
    },
    {
      name: "chatIcon",
      icon: {
        active: ChatRoundedIcon,
        passive: SpeakerNotesOffRoundedIcon,
      },
      handleActiveToggle: () => {},
      handlePassiveToggle: () => {},
    },
    {
      name: "participantIcon",
      icon: {
        active: PeopleAltRoundedIcon,
        passive: MicOffIcon,
      },
      handleActiveToggle: () => {},
      handlePassiveToggle: () => {},
    },
    {
      name: "settingsIcon",
      icon: {
        active: SettingsIcon,
        passive: MicOffIcon,
      },
      handleActiveToggle: () => {},
      handlePassiveToggle: () => {},
    },
  ];

  // const doThis = (index: any) => {
  //   let tmp = icons_list_left;
  //   // console.log(tmp);
  //   // console.log(index);
  //   tmp[index].isActive = !tmp[index].isActive;
  //   // tmp[index].isActive = !tmp[index].isActive;
  //   seticons_list_left(tmp);
  //   console.log(icons_list_left);
  // };

  return (
    <Grid item container style={{ alignItems: "center" }}>
      <Grid container className={classes.button_tray_left}>
        {icons_list_left.map((icon, index) => (
          <ButtonInfo
            key={index}
            iconActive={icon.icon.active}
            iconPassive={icon.icon.passive}
            handleActiveToggle={icon.handleActiveToggle}
            handlePassiveToggle={icon.handlePassiveToggle}
          />
        ))}
      </Grid>
      <Button
        onClick={() => {
          alert("end call");
        }}
        className={classes.end_call}
      >
        <CallEndIcon />
      </Button>
      <Grid container className={classes.button_tray_right}>
        {icons_list_right.map((icon, index) => (
          <ButtonInfo
            key={index}
            iconActive={icon.icon.active}
            iconPassive={icon.icon.passive}
            handleActiveToggle={icon.handleActiveToggle}
            handlePassiveToggle={icon.handlePassiveToggle}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default ButtonTray;
