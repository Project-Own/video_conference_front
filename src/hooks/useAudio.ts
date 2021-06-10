import { useEffect, useState } from "react";
import { Logger } from "../utils/logger";

export const useAudio = (
  requestedMedia: MediaStreamConstraints,
  isAudioOn: boolean
): MediaStreamTrack[] | null => {
  const [audioTracks, setAudioTracks] =
    useState<MediaStreamTrack[] | null>(null);

  const closeAudio = () => {
    if (audioTracks) {
      audioTracks?.forEach((track) => track.stop());
      setAudioTracks(null);
    }
  };

  const getAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: requestedMedia.audio,
      });
      const audio = stream.getAudioTracks();
      if (audio.length > 0) Logger(`Using audio device: ${audio[0].label}`);

      setAudioTracks(audio);
    } catch (err) {
      Logger(err);
    }
  };

  useEffect(() => {
    if (isAudioOn) {
      getAudio();
    } else {
      closeAudio();
    }
    return () => closeAudio();
  }, [isAudioOn]);

  return audioTracks;
};
