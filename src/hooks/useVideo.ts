import { useEffect, useState } from "react";
import {
  closeMediaTracks,
  getAvailableMediaDevices,
  getMediaTracks,
  handleMediaDeviceChange,
  handleMediaDeviceToggle,
} from "./../utils/media.utils";

export const useVideo = (requestedMedia: MediaStreamConstraints) => {
  const [videoTracks, setVideoTracks] =
    useState<MediaStreamTrack[] | null>(null);

  const [isVideoOn, setIsVideoOn] = useState(false);
  const [videoDevices, setVideoDevices] =
    useState<MediaDeviceInfo[] | null>(null);

  const handleVideoToggle = () => {
    handleMediaDeviceToggle("Video", isVideoOn, setIsVideoOn);
  };
  const handleVideoDeviceChange = () => {
    handleMediaDeviceChange();
  };

  useEffect(() => {
    getAvailableMediaDevices("videoinput", setVideoDevices);
    if (isVideoOn) {
      getMediaTracks(
        {
          video: requestedMedia.video,
        },
        setVideoTracks
      );
    } else {
      closeMediaTracks(videoTracks, setVideoTracks);
    }
    return () => closeMediaTracks(videoTracks, setVideoTracks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVideoOn]);

  return [
    videoDevices,
    videoTracks,
    isVideoOn,
    handleVideoToggle,
    handleVideoDeviceChange,
  ] as const;
};
