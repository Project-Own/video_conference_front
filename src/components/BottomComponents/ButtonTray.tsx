import {
  CallEndRounded,
  Chat,
  Mic,
  MicOff,
  PeopleRounded,
  ScreenShareOutlined,
  Settings,
  StopScreenShareOutlined,
  VideoCameraBackOutlined,
  VideoCameraFrontOutlined
} from "@mui/icons-material";
import { Button, Drawer, Grid, useTheme } from "@mui/material";
import { useContext } from "react";
import { ConferenceContext } from "src/context/ConferenceContext";
import { UIContext } from "src/context/UIContext";
import ButtonInfo from "./ButtonInfo";
import ChatGrid from "./gridview/chatGrid1";
import ParticipantGrid from "./gridview/participantGrid";
import SettingsGrid from "./gridview/SettingsGrid";

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     buttons: {
//       maxheight: "44px",
//       minWidth: "44px",
//       minHeight: "44px",
//       maxWidth: "44px",
//       background: "#FFFFFF",
//       boxShadow: "0px 4px 6px 2px rgba(0, 0, 0, 0.30)",
//       mixBlendMode: "overlay",
//       borderRadius: "14px",
//       "&:hover": {
//         color: "white",
//       },
//     },
//     button_tray_left: {
//       zIndex: 1,
//     },
//     end_call: {
//       // maxheight: "72px",
//       // minWidth: "72px",
//       // minHeight: "72px",
//       // maxWidth: "72px",
//       padding: theme.spacing(2),
//       background: "#cb2020",
//       // borderRadius: "40px",
//       boxShadow: "0px 4px 6px 2px rgba(0, 0, 0, 0.30)",
//       // position: "absolute",
//       // height: "56px",
//       // left: "732px",
//       zIndex: 2,
//       "&:hover": {
//         color: "white",
//         background: "#8b0000",
//       },
//     },
//     button_tray_right: {
//       // background: "#2F4F4F",
//       // borderRadius: "0px 16px 16px 0px",
//       // width: "280px",
//       // position: "absolute",
//       // height: "56px",
//       // left: "791px",
//       // alignItems: "center",
//       zIndex: 1,
//       // paddingLeft: "14px",
//       // justifyContent: "space-around",
//     },
//     drawer: {
//       width: "320px",
//       background: "#A4A4A4",
//     },
//   })
// );

const ButtonTray = () => {
  // const classes = useStyles();
  // const [on, seton] = useState(false);
  const { themeMode } = useContext(UIContext);
  const {
    microphone,
    webcam,
    screenShare,
    chat,
    participant,
    setting,
    leaveCall,
    toggle,
  } = useContext(ConferenceContext);

  const icons_list_left = [
    {
      name: "videoIcon",
      icon: {
        active: VideoCameraFrontOutlined,
        passive: VideoCameraBackOutlined,
      },
      state: webcam,
      handleToggle: () => toggle("webcam"),
    },
    {
      name: "micIcon",
      icon: {
        active: Mic,
        passive: MicOff,
      },
      state: microphone,
      handleToggle: () => toggle("microphone"),
    },
  ];

  const icons_list_right = [
    {
      name: "screenShareIcon",
      icon: {
        active: ScreenShareOutlined,
        passive: StopScreenShareOutlined,
      },
      state: screenShare,
      handleToggle: () => toggle("screenShare"),
    },
    {
      name: "chatIcon",
      icon: {
        active: Chat,
        passive: Chat,
      },
      state: chat,
      handleToggle: () => toggle("chat"),
    },
    {
      name: "participantIcon",
      icon: {
        active: PeopleRounded,
        passive: PeopleRounded,
      },
      state: participant,
      handleToggle: () => toggle("participant"),
    },
    {
      name: "settingsIcon",
      icon: {
        active: Settings,
        passive: Settings,
      },
      state: setting,
      handleToggle: () => toggle("setting"),
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

  const theme = useTheme();
  return (
    <Grid
      xs={12}
      item
      sx={{
        backgroundColor:
          themeMode === "light"
            ? theme.palette.primary.dark
            : theme.palette.primary.main,
        padding: theme.spacing(1),
        borderRadius: "16px 16px 16px 16px",
      }}
      alignItems="center"
      justifyContent="center"
      container
      direction="row"
    >
      <Grid
        item
        spacing={2}
        xs={4}
        md={3}
        container
        alignItems="center"
        justifyContent="center"
        // className={classes.button_tray_left}
        direction="row"
        // spacing={2}
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
        alignItems="center"
        justifyContent="center"
        xs={2}
        md={1}
        // lg={1}
      >
        <Button
          onClick={() => leaveCall()}
          variant="contained"
          color="error"
          sx={{ borderRadius: "2em" }}
        >
          <CallEndRounded />
        </Button>
      </Grid>
      <Grid
        item
        container
        spacing={2}
        xs={6}
        md={6}
        // className={classes.button_tray_right}
        direction="row"
        alignItems="center"
        justifyContent="center"
        // spacing={2}
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
        // classes={{ paper: classes.drawer }}
        anchor="right"
        open={chat}
        onClose={() => toggle("chat")}
        transitionDuration={{ enter: 600, exit: 300 }}
      >
        <ChatGrid />
      </Drawer>
      <Drawer
        // classes={{ paper: classes.drawer }}
        anchor="right"
        open={participant}
        onClose={() => toggle("participant")}
        transitionDuration={{ enter: 600, exit: 300 }}
      >
        <ParticipantGrid />
      </Drawer>
      <Drawer
        // classes={{ paper: classes.drawer }}
        anchor="right"
        open={setting}
        onClose={() => toggle("setting")}
        transitionDuration={{ enter: 600, exit: 300 }}
      >
        <SettingsGrid />
      </Drawer>
    </Grid>
  );
};

export default ButtonTray;
