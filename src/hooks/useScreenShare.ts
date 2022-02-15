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

  const { screenShare, setStream, stream } = useContext(ConferenceContext);

  const startVideoTracks = () => {
    let mediaTrackConstraint: MediaTrackConstraints | undefined;
    mediaTrackConstraint = DEFAULT_VIDEO_CONSTRAINTS.video;

    // if (mediaTrackConstraint) {
    //   mediaTrackConstraint.deviceId = webcamDeviceID;

    getDisplayMediaTracks(
      { video: mediaTrackConstraint, audio: false },
      setVideoTracks
    );
  };
  // const isFirefox = navigator.userAgent.indexOf("Firefox") !== -1;

  const stopVideoTracks = () => {
    if (videoTracks) stream?.removeTrack(videoTracks[0]);

    closeMediaTracks(videoTracks, setVideoTracks);
  };

  useEffect(() => {
    console.log("Screen Share Toggled", screenShare);
    if (!screenShare) {
      stopVideoTracks();
      return stopVideoTracks;
    }
    startVideoTracks();

    return stopVideoTracks;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenShare]);

  useEffect(() => {}, [videoTracks]);

  useEffect(() => {
    if (!videoTracks) return;

    if (videoTracks && videoTracks?.length > 0)
      videoTracks[0].onended = () => stopVideoTracks();

    if (
      stream &&
      stream.getAudioTracks() &&
      stream.getAudioTracks().length > 0
    ) {
      setStream(new MediaStream([videoTracks[0], stream.getAudioTracks()[0]]));
      return;
    }
    setStream(new MediaStream(videoTracks));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoTracks]);
};
