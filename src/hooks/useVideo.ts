import { useEffect, useState } from "react";
import { Logger } from "../utils/logger";

export const useVideo = (
  requestedMedia: MediaStreamConstraints,
  isVideoOn: boolean
): MediaStreamTrack[] | null => {
  const [videoTracks, setVideoTracks] =
    useState<MediaStreamTrack[] | null>(null);

  const closeVideo = () => {
    if (videoTracks) {
      videoTracks?.forEach((track) => track.stop());
      setVideoTracks(null);
    }
  };

  const getVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: requestedMedia.video,
      });
      const video = stream.getVideoTracks();
      if (video.length > 0) Logger(`Using video device: ${video[0].label}`);

      setVideoTracks(video);
    } catch (err) {
      Logger(err);
    }
  };

  useEffect(() => {
    if (isVideoOn) {
      getVideo();
    } else {
      closeVideo();
    }
    return () => closeVideo();
  }, [isVideoOn]);

  return videoTracks;
};
