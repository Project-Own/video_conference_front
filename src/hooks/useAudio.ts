import { useContext, useEffect, useState } from "react";
import { ConferenceContext } from "src/context/ConferenceContext";
import {
  closeMediaTracks,
  getAvailableMediaDevices,
  getMediaTracks,
} from "../utils/media.utils";

export const useAudio = () => {
  const [audioTracks, setAudioTracks] = useState<MediaStreamTrack[] | null>(
    null
  );

  const DEFAULT_AUDIO_CONSTRAINTS = {
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: false,
    },
  };

  const {
    microphone,
    microphoneDeviceId,

    setMicrophoneDeviceId,
    setMicrophoneDevices,
  } = useContext(ConferenceContext);

  const startAudioTracks = () => {
    let mediaTrackConstraint: MediaTrackConstraints | undefined;
    mediaTrackConstraint = DEFAULT_AUDIO_CONSTRAINTS.audio;

    if (mediaTrackConstraint) {
      mediaTrackConstraint.deviceId = microphoneDeviceId;

      getMediaTracks({ audio: mediaTrackConstraint }, setAudioTracks);
    }
  };
  // const isFirefox = navigator.userAgent.indexOf("Firefox") !== -1;

  const stopAudioTracks = () => {
    closeMediaTracks(audioTracks, setAudioTracks);
  };

  useEffect(() => {
    // console.log("Microphone Toggled", microphone);
    if (!microphone || !microphoneDeviceId) {
      stopAudioTracks();
      return stopAudioTracks;
    }

    startAudioTracks();

    // navigator.permissions.query({ name: "camera" }).then((result) => {
    //   if (result.state === "denied") {
    //     togglemicrophone();
    //     alert("Camera Will not function when camera Permission is denied.");
    //   } else if (result.state === "granted") {
    //     startAudioTracks();
    //   }
    // });

    return stopAudioTracks;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [microphone, microphoneDeviceId]);

  useEffect(() => {
    getAvailableMediaDevices("audioinput", (devices) =>
      setMicrophoneDevices(devices!)
    ).then((devices) => {
      if (devices) {
        if (devices[0].deviceId !== "")
          setMicrophoneDeviceId(devices[0].deviceId);
      }
    });

    return stopAudioTracks;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    audioTracks,
  };
};
