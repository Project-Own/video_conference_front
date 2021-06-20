import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import { useAudio } from "../../hooks/useAudio";
import { useWebcam } from "../../hooks/useWebcam";
import logo from "../../logo.svg";
import { Video } from "./CamerStyles";
const CAPTURE_MenuItemS: MediaStreamConstraints = {
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: false,
  },
  video: {
    frameRate: { ideal: 10, max: 15 },
    width: { ideal: 1280 },
    height: { ideal: 720 },
  },
};

const Camera = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const {
    audioDevices,
    audioTracks,
    microphone,
    activeAudioDevice,
    toggleMicrophone,
    setActiveAudioDevice,
  } = useAudio(CAPTURE_MenuItemS);

  const {
    videoDevices,
    videoTracks,
    webcam,
    activeVideoDevice,

    setActiveVideoDevice,
    toggleWebcam,
  } = useWebcam(CAPTURE_MenuItemS);

  /**
   * UseEffect prevents flickering caused by rerendering
   * Toggling of button that causes rerender will caouse
   * flicker due to change in srcObject.
   * To prevent this useEffect is used for both audio and video streamss.
   * */
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = videoTracks
        ? new MediaStream(videoTracks)
        : null;
    }
  }, [videoTracks]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.srcObject = audioTracks
        ? new MediaStream(audioTracks)
        : null;
    }
  }, [audioTracks]);

  useEffect(() => {
    if (microphone) {
      setIsAudioPlaying(false);
    }
  }, [microphone]);

  useEffect(() => {
    if (webcam) {
      setIsVideoPlaying(false);
    }
  }, [webcam]);

  return (
    <Card>
      <CardContent
        style={{
          height: 600,
          width: 600,
        }}
      >
        <Video
          ref={videoRef}
          // hidden={!webcam}
          poster={logo}
          onCanPlayThrough={() => {
            setIsVideoPlaying(true);
            videoRef.current?.play().catch((e) => {
              console.log(e);
            });
          }}
          onError={() => console.log("Something went wrorn in video")}
          autoPlay
          playsInline
          muted
          style={{
            height: "100%",
            width: "auto",
          }}
        />
        <audio
          onCanPlayThrough={() => {
            setIsAudioPlaying(true);
            audioRef.current?.play().catch((e) => {
              console.log(e);
            });
          }}
          ref={audioRef}
        />
      </CardContent>
      <CardActions>
        <Button
          disabled={!isVideoPlaying && webcam}
          onClick={() => {
            toggleWebcam();
          }}
        >
          {!webcam ? "Open Webcam" : "Close Webcam"}
        </Button>
        <Button
          disabled={!isAudioPlaying && microphone}
          onClick={() => {
            toggleMicrophone();
          }}
        >
          {!microphone ? "Open Microphone" : "Close Microphone"}
        </Button>
        <FormControl>
          <InputLabel htmlFor="audio-input-device">
            Audio Input Devices
          </InputLabel>
          <Select
            onChange={({ target }) => {
              const { value } = target;

              setActiveAudioDevice(value as string);
            }}
            renderValue={(value) => {
              const id = value as string;
              let device;
              if (audioDevices) {
                device = audioDevices.filter(
                  (device) => device.deviceId === id
                );

                if (device.length !== 0) {
                  return `🎙  ${device[0].label} `;
                }
              }
            }}
            value={activeAudioDevice ? activeAudioDevice : ""}
            inputProps={{
              name: "deviceId",
              id: "audio-input-device",
            }}
          >
            {audioDevices?.map((audioDevice: MediaDeviceInfo) => (
              <MenuItem key={audioDevice.deviceId} value={audioDevice.deviceId}>
                {audioDevice.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="video-input-device">
            Video Input Devices
          </InputLabel>
          <Select
            onChange={({ target }) => {
              const { value } = target;

              setActiveVideoDevice(value as string);
            }}
            // displayEmpty

            renderValue={(value) => {
              const id = value as string;
              let device;
              if (videoDevices) {
                device = videoDevices.filter(
                  (device) => device.deviceId === id
                );
                if (device.length !== 0) {
                  return `📸  ${device[0].label} `;
                }
              }
            }}
            value={activeVideoDevice ? activeVideoDevice : ""}
            inputProps={{
              name: "deviceId",
              id: "video-input-device",
            }}
          >
            {videoDevices?.map((videoDevice: MediaDeviceInfo) => (
              <MenuItem key={videoDevice.deviceId} value={videoDevice.deviceId}>
                {videoDevice.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </CardActions>
    </Card>
  );
};

export default Camera;