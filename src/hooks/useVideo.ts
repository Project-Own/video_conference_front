import { useEffect, useState } from "react";
import {
  closeMediaTracks,
  getAvailableMediaDevices,
  getMediaTracks,
  handleMediaDeviceToggle,
} from "./../utils/media.utils";

export const useVideo = (requestedMedia: MediaStreamConstraints) => {
  const [videoTracks, setVideoTracks] =
    useState<MediaStreamTrack[] | null>(null);

  const [isVideoOn, setIsVideoOn] = useState(false);
  const [videoDevices, setVideoDevices] =
    useState<MediaDeviceInfo[] | null>(null);
  const [activeVideoDevice, setActiveVideoDevice] = useState<string>();

  const DEFAULT_VIDEO_CONSTRAINTS = {
    video: {},
  };

  const handleVideoToggle = () => {
    handleMediaDeviceToggle("Video", isVideoOn, setIsVideoOn);
  };

  const startVideoTracks = () => {
    let mediaTrackConstraint: MediaTrackConstraints | undefined;
    if (typeof requestedMedia["video"] === "boolean") {
      mediaTrackConstraint = DEFAULT_VIDEO_CONSTRAINTS.video;
    } else {
      mediaTrackConstraint = requestedMedia
        ? requestedMedia.video
        : DEFAULT_VIDEO_CONSTRAINTS["video"];
    }

    if (mediaTrackConstraint) {
      mediaTrackConstraint.deviceId = activeVideoDevice;

      getMediaTracks({ video: mediaTrackConstraint }, setVideoTracks);
    }
  };

  const stopVideoTracks = () => {
    closeMediaTracks(videoTracks, setVideoTracks);
  };

  useEffect(() => {
    stopVideoTracks();
    if (isVideoOn) {
      navigator.permissions.query({ name: "camera" }).then((result) => {
        if (result.state === "denied") {
          setIsVideoOn(false);
          alert("Camera Will not function when camera Permission is denied.");
        } else if (result.state === "granted") {
          startVideoTracks();
        }
      });
    }
    return stopVideoTracks;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVideoOn, activeVideoDevice]);

  useEffect(() => {
    getAvailableMediaDevices("videoinput", setVideoDevices).then((devices) => {
      if (devices) {
        if (devices[0].deviceId !== "")
          setActiveVideoDevice(devices[0].deviceId);
      }
    });

    return stopVideoTracks;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [
    videoDevices,
    videoTracks,
    isVideoOn,
    activeVideoDevice,
    handleVideoToggle,
    setActiveVideoDevice,
  ] as const;
};
