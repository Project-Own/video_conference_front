import { useEffect, useState } from "react";
import {
  closeMediaTracks,
  getAvailableMediaDevices,
  getMediaTracks,
  handleMediaDeviceChange,
  handleMediaDeviceToggle,
} from "./../utils/media.utils";

export const useAudio = (requestedMedia: MediaStreamConstraints) => {
  const [audioTracks, setAudioTracks] =
    useState<MediaStreamTrack[] | null>(null);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [audioDevices, setAudioDevices] =
    useState<MediaDeviceInfo[] | null>(null);

  const handleAudioToggle = () => {
    handleMediaDeviceToggle("Audio", isAudioOn, setIsAudioOn);
  };
  const handleAudioDeviceChange = () => {
    handleMediaDeviceChange();
  };

  useEffect(() => {
    getAvailableMediaDevices("audioinput", setAudioDevices);
    if (isAudioOn) {
      getMediaTracks(
        {
          audio: requestedMedia.audio,
        },
        setAudioTracks
      );
    } else {
      closeMediaTracks(audioTracks, setAudioTracks);
    }
    return () => closeMediaTracks(audioTracks, setAudioTracks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAudioOn]);

  return [
    audioDevices,
    audioTracks,
    isAudioOn,
    handleAudioToggle,
    handleAudioDeviceChange,
  ] as const;
};
