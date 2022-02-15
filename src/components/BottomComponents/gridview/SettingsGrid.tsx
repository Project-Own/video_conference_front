import { Close } from "@mui/icons-material";
import {
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { ChangeEvent, useContext } from "react";
import { ConferenceContext } from "src/context/ConferenceContext";

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     text: {
//       fontFamily: "Noto Sans JP",
//       fontStyle: "normal",
//       fontWeight: 500,
//       fontSize: "26px",
//       lineHeight: "52px",
//       textAlign: "center",
//       color: "black",
//     },
//     closeButton: {
//       transition: "transform .25s, opacity .25s",
//       position: "absolute",
//       // top: 4,
//       right: 2,
//       "&:hover": {
//         color: "black",
//         background: "transparent",
//         transform: "rotate(90deg)",
//       },
//     },
//     participantBox: {
//       marginTop: "20px",
//     },
//     textField: {
//       background: "#e5e4e2",
//       borderRadius: "12px",
//       width: "254px",
//       "&:hover": {
//         color: "#e5e4e2",
//         background: "#e5e4e2",
//       },
//       // height: "40px",
//     },
//     info: {
//       padding: "2em",
//     },
//   })
// );

const SettingsGrid = () => {
  const {
    toggle,
    webcamDevices,
    microphoneDevices,
    microphoneDeviceId,
    webcamDeviceId,
    setWebcamDeviceId,
    setMicrophoneDeviceId,
  } = useContext(ConferenceContext);

  // const { glbModelNames, setModelName } = useAR();
  const handleChange = (
    event: ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    // eslint-disable-next-line eqeqeq
    // if (event.target.value == 69) {
    //   setModelName("cube");
    // } else {
    //   setModelName(glbModelNames[event.target.value! as number]);
    // }
  };
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid container alignItems="center" justifyContent="center">
        <Typography
        // className={classes.text}
        >
          Setting(s)
        </Typography>
        <IconButton
          color="error"
          // className={classes.closeButton}
          onClick={() => toggle("setting")}
        >
          <Close />
        </IconButton>
      </Grid>
      <Grid item alignItems="center" justifyContent="center">
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

              setMicrophoneDeviceId(value as string);
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
            value={microphoneDeviceId ? microphoneDeviceId : ""}
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

      <Grid item alignItems="center" justifyContent="center">
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

              setWebcamDeviceId(value as string);
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
            value={webcamDeviceId ? webcamDeviceId : ""}
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

      <Grid item alignItems="center" justifyContent="center">
        <div
          // className={classes.info}
          style={{ padding: "2em" }}
        >
          <FormControl>
            <InputLabel>Available Models</InputLabel>
            {/* <Select native onChange={handleChange}>
              <option value={69}>Default Cube</option>
              {glbModelNames.map((name, key) => (
                <option key={key} value={key}>
                  {name}
                </option>
              ))}
            </Select> */}
          </FormControl>
          <p>
            AR Marker:
            <a href="https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/hiro.png">
              Hiro
            </a>
          </p>
          <p>Display marker to place AR model on.</p>
          <p>Rotation: w🔺 s🔻 d🔺 a🔻</p>
          <p>
            CapitalLetter(Shift+key) **Keep Pressing if slow scaling Scale by
            0.01 W🔺 S🔻
          </p>

          <p>Reset Rotation: D💞 </p>
          <p>Reset Scale: A💞 </p>
        </div>
      </Grid>
    </Grid>
  );
};

export default SettingsGrid;
