import { useContext, useEffect, useState } from "react";
import { ConferenceContext } from "src/context/ConferenceContext";
import { closeMediaTracks, getDisplayMediaTracks } from "../utils/media.utils";

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

  const [screenShareVideoTracks, setScreenShareVideoTracks] = useState<
    MediaStreamTrack[] | null
  >(null);
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

  const { screenShare } = useContext(ConferenceContext);

  const startVideoTracks = () => {
    let mediaTrackConstraint: MediaTrackConstraints | undefined;
    mediaTrackConstraint = DEFAULT_VIDEO_CONSTRAINTS.video;

    // if (mediaTrackConstraint) {
    //   mediaTrackConstraint.deviceId = webcamDeviceID;

    getDisplayMediaTracks(
      { video: mediaTrackConstraint, audio: false },
      setScreenShareVideoTracks
    );
  };
  // const isFirefox = navigator.userAgent.indexOf("Firefox") !== -1;

  const stopVideoTracks = () => {
    closeMediaTracks(screenShareVideoTracks, setScreenShareVideoTracks);
  };

  useEffect(() => {
    // console.log("Screen Share Toggled", screenShare);
    if (!screenShare) {
      stopVideoTracks();
      return;
    }
    startVideoTracks();

    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenShare]);

  return {
    screenShareVideoTracks,
  };
};
