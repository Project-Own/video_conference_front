import { useEffect, useState } from "react";
import {
  closeMediaTracks,
  getAvailableMediaDevices,
  getMediaTracks,
} from "../utils/media.utils";
import { useTray } from "./useTray";

interface WebcamProps {
  height?: number;
  width?: number;
  frameRate?: number;
}
export const useWebcam = (props: WebcamProps) => {
  const { height = 720, width = 720, frameRate = 24 } = props;

  const [videoTracks, setVideoTracks] =
    useState<MediaStreamTrack[] | null>(null);
  const [videoDevices, setVideoDevices] =
    useState<MediaDeviceInfo[] | null>(null);
  const [activeVideoDevice, setActiveVideoDevice] = useState<string>();

  const DEFAULT_VIDEO_CONSTRAINTS = {
    video: {
      frameRate: { ideal: frameRate },
      width: { ideal: width },
      height: { ideal: height },
    },
  };

  const { webcam, toggleWebcam } = useTray();

  const startVideoTracks = () => {
    let mediaTrackConstraint: MediaTrackConstraints | undefined;
    mediaTrackConstraint = DEFAULT_VIDEO_CONSTRAINTS.video;

    if (mediaTrackConstraint) {
      mediaTrackConstraint.deviceId = activeVideoDevice;

      getMediaTracks({ video: mediaTrackConstraint }, setVideoTracks);
    }
  };
  // const isFirefox = navigator.userAgent.indexOf("Firefox") !== -1;

  const stopVideoTracks = () => {
    closeMediaTracks(videoTracks, setVideoTracks);
  };

  useEffect(() => {
    console.log("Webcam Toggled");
    stopVideoTracks();
    if (webcam) {
      startVideoTracks();

      // navigator.permissions.query({ name: "camera" }).then((result) => {
      //   if (result.state === "denied") {
      //     toggleWebcam();
      //     alert("Camera Will not function when camera Permission is denied.");
      //   } else if (result.state === "granted") {
      //     startVideoTracks();
      //   }
      // });
    }
    return stopVideoTracks;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webcam]);

  useEffect(() => {
    getAvailableMediaDevices("videoinput", setVideoDevices).then((devices) => {
      if (devices) {
        if (devices[0].deviceId !== "")
          setActiveVideoDevice(devices[0].deviceId);
      }
    });

    return stopVideoTracks;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    videoDevices,
    videoTracks,
    webcam,
    activeVideoDevice,
    toggleWebcam,
    setActiveVideoDevice,
    height,
    width,
  };
};
