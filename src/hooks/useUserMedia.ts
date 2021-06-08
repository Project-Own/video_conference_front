import { useEffect, useState } from "react";
import { Logger } from "../utils/logger";
export const useUserMedia = (requestedMedia: MediaStreamConstraints) => {
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

    if (!mediaStream) {
      enableVideoStream();
    } else {
      return function cleanup() {
        mediaStream.getTracks().forEach((track) => track.stop());
      };
    }
  }, [mediaStream, requestedMedia]);

  return mediaStream;
};
