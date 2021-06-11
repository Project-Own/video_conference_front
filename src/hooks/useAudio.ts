import { useEffect, useState } from "react";
import {
  closeMediaTracks,
  getAvailableMediaDevices,
  getMediaTracks,
  handleMediaDeviceToggle,
} from "./../utils/media.utils";

export const useAudio = (requestedMedia: MediaStreamConstraints) => {
  const [audioTracks, setAudioTracks] =
    useState<MediaStreamTrack[] | null>(null);
  const [isAudioOn, setIsAudioOn] = useState(false);
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

  const handleAudioToggle = () => {
    handleMediaDeviceToggle("Audio", isAudioOn, setIsAudioOn);
  };

  const stopAudioTracks = () => closeMediaTracks(audioTracks, setAudioTracks);

  const startAudioTracks = () => {
    let mediaTrackConstraint: MediaTrackConstraints | undefined;
    if (typeof requestedMedia["audio"] === "boolean") {
      mediaTrackConstraint = DEFAULT_AUDIO_CONSTRAINTS.audio;
    } else {
      mediaTrackConstraint = requestedMedia
        ? requestedMedia.audio
        : DEFAULT_AUDIO_CONSTRAINTS["audio"];
    }

    if (mediaTrackConstraint) {
      mediaTrackConstraint.deviceId = activeAudioDevice;
      getMediaTracks({ audio: mediaTrackConstraint }, setAudioTracks);
    }
  };

  useEffect(() => {
    getAvailableMediaDevices("videoinput", setAudioDevices).then((devices) => {
      if (devices) {
        setActiveAudioDevice(devices[0].deviceId);
      }
    });

    return stopAudioTracks;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getAvailableMediaDevices("audioinput", setAudioDevices);
    stopAudioTracks();
    if (isAudioOn && activeAudioDevice) {
      startAudioTracks();
    }
    return stopAudioTracks;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAudioOn, activeAudioDevice]);

  return [
    audioDevices,
    audioTracks,
    isAudioOn,
    activeAudioDevice,
    handleAudioToggle,
    setActiveAudioDevice,
  ] as const;
};
