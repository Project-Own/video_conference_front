import { useEffect, useState } from "react";
import {
  closeMediaTracks,
  getAvailableMediaDevices,
  getMediaTracks,
} from "./../utils/media.utils";
import { useTray } from "./useTray";

export const useAudio = (requestedMedia: MediaStreamConstraints) => {
  const [audioTracks, setAudioTracks] =
    useState<MediaStreamTrack[] | null>(null);
  const [audioDevices, setAudioDevices] =
    useState<MediaDeviceInfo[] | null>(null);
  const [activeAudioDevice, setActiveAudioDevice] = useState<string>();

  const DEFAULT_AUDIO_CONSTRAINTS = {
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: false,
    },
  };

  const isFirefox = navigator.userAgent.indexOf("Firefox") !== -1;

  const { microphone, toggleMicrophone } = useTray();

  const stopAudioTracks = () => closeMediaTracks(audioTracks, setAudioTracks);

  const startAudioTracks = () => {
    let mediaTrackConstraint: MediaTrackConstraints | undefined;
    if (typeof requestedMedia["audio"] === "boolean") {
      mediaTrackConstraint = DEFAULT_AUDIO_CONSTRAINTS.audio;
    } else {
      mediaTrackConstraint = requestedMedia
        ? { ...DEFAULT_AUDIO_CONSTRAINTS["audio"], ...requestedMedia.audio }
        : DEFAULT_AUDIO_CONSTRAINTS["audio"];
    }

    if (mediaTrackConstraint) {
      mediaTrackConstraint.deviceId = activeAudioDevice;
      getMediaTracks({ audio: mediaTrackConstraint }, setAudioTracks);
    }
  };

  useEffect(() => {
    getAvailableMediaDevices("audioinput", setAudioDevices).then((devices) => {
      if (devices) {
        if (devices[0].deviceId !== "")
          setActiveAudioDevice(devices[0].deviceId);
      }
    });

    return stopAudioTracks;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    stopAudioTracks();
    if (microphone) {
      if (isFirefox) {
        startAudioTracks();
      } else {
        navigator.permissions
          .query({ name: "microphone" })
          .then((result) => {
            if (result.state === "denied") {
              alert(
                "Microphone will not function when microphone Permission is denied."
              );
              toggleMicrophone();
            } else if (result.state === "granted") {
              startAudioTracks();
            }
          })
          .catch((e) => console.log(e));
      }
    }
    return stopAudioTracks;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [microphone, activeAudioDevice]);

  return {
    audioDevices,
    audioTracks,
    microphone,
    activeAudioDevice,
    toggleMicrophone,
    setActiveAudioDevice,
  };
};
