import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import { useTray } from "../../hooks/useTray";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      fontFamily: "Noto Sans JP",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "26px",
      lineHeight: "52px",
      textAlign: "center",
      color: "black",
    },
    closeButton: {
      transition: "transform .25s, opacity .25s",
      position: "absolute",
      // top: 4,
      right: 2,
      "&:hover": {
        color: "black",
        background: "transparent",
        transform: "rotate(90deg)",
      },
    },
    participantBox: {
      marginTop: "20px",
    },
    textField: {
      background: "#e5e4e2",
      borderRadius: "12px",
      width: "254px",
      "&:hover": {
        color: "#e5e4e2",
        background: "#e5e4e2",
      },
      // height: "40px",
    },
  })
);

const SettingsGrid = () => {
  const {
    toggleSetting,
    webcamDevices,
    microphoneDevices,
    microphoneDeviceID,
    webcamDeviceID,
    setWebcamDeviceID,
    setMicrophoneDeviceID,
  } = useTray();
  const classes = useStyles();

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid container justify="center" alignItems="center">
        <Typography className={classes.text}>Setting(s)</Typography>
        <IconButton className={classes.closeButton} onClick={toggleSetting}>
          <CloseIcon />
        </IconButton>
      </Grid>
      <Grid item>
        <FormControl>
          <InputLabel htmlFor="audio-input-device">
            Audio Input Devices
          </InputLabel>
          <Select
            style={{
              textOverflow: "ellipsis",
              msTextOverflow: "ellipsis",

              width: 200,
            }}
            onChange={({ target }) => {
              const { value } = target;

              setMicrophoneDeviceID({ value: value as string });
            }}
            renderValue={(value) => {
              const id = value as string;
              let device;
              if (microphoneDevices) {
                device = microphoneDevices.filter(
                  (device) => device.deviceId === id
                );

                if (device.length !== 0) {
                  return `🎙  ${device[0].label} `;
                }
              }
            }}
            value={microphoneDeviceID ? microphoneDeviceID : ""}
            inputProps={{
              name: "deviceId",
              id: "audio-input-device",
            }}
          >
            {microphoneDevices?.map((audioDevice: MediaDeviceInfo) => (
              <MenuItem key={audioDevice.deviceId} value={audioDevice.deviceId}>
                {audioDevice.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item>
        <FormControl>
          <InputLabel htmlFor="video-input-device">
            Video Input Devices
          </InputLabel>
          <Select
            style={{
              textOverflow: "ellipsis",
              msTextOverflow: "ellipsis",

              width: 200,
            }}
            onChange={({ target }) => {
              const { value } = target;

              setWebcamDeviceID({ value: value as string });
            }}
            // displayEmpty

            renderValue={(value) => {
              const id = value as string;
              let device;
              if (webcamDevices) {
                device = webcamDevices.filter(
                  (device) => device.deviceId === id
                );
                if (device.length !== 0) {
                  return `📸  ${device[0].label} `;
                }
              }
            }}
            value={webcamDeviceID ? webcamDeviceID : ""}
            inputProps={{
              name: "deviceId",
              id: "video-input-device",
            }}
          >
            {webcamDevices?.map((videoDevice: MediaDeviceInfo) => (
              <MenuItem key={videoDevice.deviceId} value={videoDevice.deviceId}>
                {videoDevice.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default SettingsGrid;
