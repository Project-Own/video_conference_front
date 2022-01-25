import { IconButton } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import CallEndIcon from "@material-ui/icons/CallEnd";
import ChatRoundedIcon from "@material-ui/icons/ChatRounded";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import PeopleAltRoundedIcon from "@material-ui/icons/PeopleAltRounded";
import ScreenShareOutlinedIcon from "@material-ui/icons/ScreenShareOutlined";
import SettingsIcon from "@material-ui/icons/Settings";
import StopScreenShareOutlinedIcon from "@material-ui/icons/StopScreenShareOutlined";
import VideocamOffOutlinedIcon from "@material-ui/icons/VideocamOffOutlined";
import VideocamOutlinedIcon from "@material-ui/icons/VideocamOutlined";
import { useContext } from "react";
import { useTray } from "src/hooks/useTray";
import { SocketContext } from "src/pages/Context/Context";
import ChatGrid from "../gridview/chatGrid";
import ParticipantGrid from "../gridview/participantGrid";
import SettingsGrid from "../gridview/SettingsGrid";
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
      zIndex: 1,
    },
    end_call: {
      // maxheight: "72px",
      // minWidth: "72px",
      // minHeight: "72px",
      // maxWidth: "72px",
      padding: theme.spacing(2),
      background: "#cb2020",
      // borderRadius: "40px",
      boxShadow: "0px 4px 6px 2px rgba(0, 0, 0, 0.30)",
      // position: "absolute",
      // height: "56px",
      // left: "732px",
      zIndex: 2,
      "&:hover": {
        color: "white",
        background: "#8b0000",
      },
    },
    button_tray_right: {
      // background: "#2F4F4F",
      // borderRadius: "0px 16px 16px 0px",
      // width: "280px",
      // position: "absolute",
      // height: "56px",
      // left: "791px",
      // alignItems: "center",
      zIndex: 1,
      // paddingLeft: "14px",
      // justifyContent: "space-around",
    },
    drawer: {
      width: "320px",
      background: "#A4A4A4",
    },
  })
);

const ButtonTray = () => {
  const classes = useStyles();
  // const [on, seton] = useState(false);
  const {
    microphone,
    webcam,
    screenShare,
    chat,
    participant,
    setting,

    toggleChat,
    toggleMicrophone,
    toggleParticipant,
    toggleScreenShare,
    toggleWebcam,
    toggleSetting,
  } = useTray();
  const icons_list_left = [
    {
      name: "videoIcon",
      icon: {
        active: VideocamOutlinedIcon,
        passive: VideocamOffOutlinedIcon,
      },
      state: webcam,
      handleToggle: toggleWebcam,
    },
    {
      name: "micIcon",
      icon: {
        active: MicIcon,
        passive: MicOffIcon,
      },
      state: microphone,
      handleToggle: toggleMicrophone,
    },
  ];

  const icons_list_right = [
    {
      name: "screenShareIcon",
      icon: {
        active: ScreenShareOutlinedIcon,
        passive: StopScreenShareOutlinedIcon,
      },
      state: screenShare,
      handleToggle: toggleScreenShare,
    },
    {
      name: "chatIcon",
      icon: {
        active: ChatRoundedIcon,
        passive: ChatRoundedIcon,
      },
      state: chat,
      handleToggle: toggleChat,
    },
    {
      name: "participantIcon",
      icon: {
        active: PeopleAltRoundedIcon,
        passive: PeopleAltRoundedIcon,
      },
      state: participant,
      handleToggle: toggleParticipant,
    },
    {
      name: "settingsIcon",
      icon: {
        active: SettingsIcon,
        passive: SettingsIcon,
      },
      state: setting,
      handleToggle: toggleSetting,
    },
  ];

  const context = useContext(SocketContext);

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
    <Grid
      xs={12}
      md={7}
      lg={5}
      xl={4}
      item
      style={{
        background: "#2F4F4F",
        padding: 2,
        borderRadius: "16px 16px 16px 16px",
      }}
      container
      direction="row"
      alignItems="center"
      justify="center"
    >
      <Grid
        item
        xs={4}
        md={4}
        container
        className={classes.button_tray_left}
        direction="row"
        // spacing={2}
        alignItems="center"
        justify="space-around"
      >
        {icons_list_left.map((icon, index) => (
          <Grid item key={index}>
            <ButtonInfo
              key={index}
              iconOfLeft={true}
              iconActive={icon.icon.active}
              iconPassive={icon.icon.passive}
              state={icon.state}
              handleToggle={icon.handleToggle}
            />
          </Grid>
        ))}
      </Grid>

      <Grid
        item
        container
        xs={2}
        md={1}
        // lg={1}
        style={{
          background: "#2F4F4F",
        }}
        justify="center"
      >
        <IconButton
          onClick={() => context.leaveCall()}
          className={classes.end_call}
        >
          <CallEndIcon />
        </IconButton>
      </Grid>

      <Grid
        item
        container
        xs={6}
        md={6}
        className={classes.button_tray_right}
        direction="row"
        // spacing={2}
        alignItems="center"
        justify="space-around"
      >
        {icons_list_right.map((icon, index) => (
          <Grid item key={index}>
            <ButtonInfo
              key={index}
              iconOfLeft={false}
              iconActive={icon.icon.active}
              iconPassive={icon.icon.passive}
              state={icon.state}
              handleToggle={icon.handleToggle}
            />
          </Grid>
        ))}
      </Grid>

      <Drawer
        classes={{ paper: classes.drawer }}
        anchor="right"
        open={chat}
        onClose={toggleChat}
        transitionDuration={{ enter: 600, exit: 300 }}
      >
        <ChatGrid />
      </Drawer>
      <Drawer
        classes={{ paper: classes.drawer }}
        anchor="right"
        open={participant}
        onClose={toggleParticipant}
        transitionDuration={{ enter: 600, exit: 300 }}
      >
        <ParticipantGrid />
      </Drawer>
      <Drawer
        classes={{ paper: classes.drawer }}
        anchor="right"
        open={setting}
        onClose={toggleSetting}
        transitionDuration={{ enter: 600, exit: 300 }}
      >
        <SettingsGrid />
      </Drawer>
    </Grid>
  );
};

export default ButtonTray;
