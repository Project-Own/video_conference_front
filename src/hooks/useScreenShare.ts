import { useEffect, useState } from "react";
import { closeMediaTracks, getDisplayMediaTracks } from "../utils/media.utils";
import { useTray } from "./useTray";

interface ScreenShareProps {
  height?: number;
  width?: number;
  frameRate?: number;
  cursor: string;
}
export const useScreenShare = (props: ScreenShareProps) => {
  const {
    height = 720,
    width = 720,
    frameRate = 24,
    cursor = "always",
  } = props;

  const [videoTracks, setVideoTracks] = useState<MediaStreamTrack[] | null>(
    null
  );
  // const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[] | null>(
  //   null
  // );
  // const [activeVideoDevice, setActiveVideoDevice] = useState<string>();

  const DEFAULT_VIDEO_CONSTRAINTS = {
    video: {
      frameRate: { ideal: frameRate },
      width: { ideal: width },
      height: { ideal: height },
      cursor: cursor,
    },
  };

  const { screenShare, toggleScreenShare } = useTray();

  const startVideoTracks = () => {
    let mediaTrackConstraint: MediaTrackConstraints | undefined;
    mediaTrackConstraint = DEFAULT_VIDEO_CONSTRAINTS.video;

    // if (mediaTrackConstraint) {
    //   mediaTrackConstraint.deviceId = webcamDeviceID;

    getDisplayMediaTracks({ video: mediaTrackConstraint }, setVideoTracks);
  };
  // const isFirefox = navigator.userAgent.indexOf("Firefox") !== -1;

  const stopVideoTracks = () => {
    closeMediaTracks(videoTracks, setVideoTracks);
  };

  useEffect(() => {
    console.log("Screen Share Toggled");
    stopVideoTracks();
    if (screenShare) {
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
  }, [screenShare]);

  return {
    videoTracks,
    screenShare,

    toggleScreenShare,
    height,
    width,
  };
};
