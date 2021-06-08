import { useEffect, useState } from "react";
import { Logger } from "../utils/logger";
export const useUserMedia = (
  requestedMedia: MediaStreamConstraints,
  isWebcamOn: boolean
) => {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const enableVideoStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(
          requestedMedia
        );
        setMediaStream(stream);
      } catch (err) {
        Logger(err);
      }
    };
    const streamCleanup = () => {
      if (!!mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
        setMediaStream(null);
      }
    };
    if (isWebcamOn) {
      enableVideoStream();
    } else {
      streamCleanup();
    }
  }, [isWebcamOn]);

  return mediaStream;
};
