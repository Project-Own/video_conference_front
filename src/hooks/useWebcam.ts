import { useContext, useEffect, useState } from "react";
import { ConferenceContext } from "src/context/ConferenceContext";
import {
  closeMediaTracks,
  getAvailableMediaDevices,
  getMediaTracks,
} from "../utils/media.utils";

interface WebcamProps {
  height?: number;
  width?: number;
  frameRate?: number;
}
export const useWebcam = (props: WebcamProps) => {
  const { height = 720, width = 720, frameRate = 24 } = props;

  const [webcamVideoTracks, setWebcamVideoTracks] = useState<
    MediaStreamTrack[] | null
  >(null);
  // const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[] | null>(
  //   null
  // );
  // const [activeVideoDevice, setActiveVideoDevice] = useState<string>();

  const DEFAULT_VIDEO_CONSTRAINTS = {
    video: {
      frameRate: { ideal: frameRate },
      webcamWidth: { ideal: width },
      webcamHeight: { ideal: height },
    },
  };

  const {
    webcam,
    webcamDeviceId,
    stream,

    setWebcamDeviceId,
    setWebcamDevices,
    setWebcamTrack,
    setStream,
  } = useContext(ConferenceContext);

  const startWebcamVideoTracks = () => {
    let mediaTrackConstraint: MediaTrackConstraints | undefined;
    mediaTrackConstraint = DEFAULT_VIDEO_CONSTRAINTS.video;

    if (mediaTrackConstraint) {
      mediaTrackConstraint.deviceId = webcamDeviceId;

      getMediaTracks({ video: mediaTrackConstraint }, setWebcamVideoTracks);
    }
  };
  // const isFirefox = navigator.userAgent.indexOf("Firefox") !== -1;

  const stopWebcamVideoTracks = () => {
    if (webcamVideoTracks) stream?.removeTrack(webcamVideoTracks[0]);

    closeMediaTracks(webcamVideoTracks, setWebcamVideoTracks);
  };

  useEffect(() => {
    console.log("Webcam Toggled");
    if (!webcam || !webcamDeviceId) {
      stopWebcamVideoTracks();
      return stopWebcamVideoTracks;
    }

    startWebcamVideoTracks();

    // navigator.permissions.query({ name: "camera" }).then((result) => {
    //   if (result.state === "denied") {
    //     toggleWebcam();
    //     alert("Camera Will not function when camera Permission is denied.");
    //   } else if (result.state === "granted") {
    //     startWebcamVideoTracks();
    //   }
    // });

    return stopWebcamVideoTracks;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webcam, webcamDeviceId]);

  useEffect(() => {
    getAvailableMediaDevices("videoinput", (devices) =>
      setWebcamDevices(devices!)
    ).then((devices) => {
      if (devices) {
        if (devices[0].deviceId !== "") setWebcamDeviceId(devices[0].deviceId);
      }
    });

    return stopWebcamVideoTracks;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!webcamVideoTracks) return;

    setWebcamTrack(webcamVideoTracks[0]);

    if (
      stream &&
      stream.getAudioTracks() &&
      stream.getAudioTracks().length > 0
    ) {
      setStream(
        new MediaStream([webcamVideoTracks[0], stream.getAudioTracks()[0]])
      );
      return;
    }
    setStream(new MediaStream(webcamVideoTracks));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webcamVideoTracks]);
};
