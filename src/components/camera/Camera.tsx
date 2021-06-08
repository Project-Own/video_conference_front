import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import { useRef, useState } from "react";
import { useUserMedia } from "../../hooks/useUserMedia";
import { Logger } from "../../utils/logger";
import { Video } from "./CamerStyles";

const CAPTURE_OPTIONS: MediaStreamConstraints = {
  audio: true,
  video: { facingMode: "environment" },
};

const Camera = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const mediaStream = useUserMedia(CAPTURE_OPTIONS);

  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream;
  }

  console.log(mediaStream);

  if (!mediaStream) {
    return (
      <Card>
        <Typography>
          No User Media Found! Trying to Connect to media.
        </Typography>
      </Card>
    );
  }

  const handleVideoToggle = () => {
    setIsVideoPlaying(!isVideoPlaying);
    if (isVideoPlaying) {
      // videoRef.current?.load();
      videoRef.current?.play().catch((e) => {
        Logger(e);
      });
    }
  };

  return (
    <Card>
      <CardContent>
        <Video
          ref={videoRef}
          hidden={!isVideoPlaying}
          onError={() => Logger("Something went wrorn in video")}
          autoPlay
          playsInline
          muted
          style={{
            height: "100%",
            width: "auto",
          }}
        />
      </CardContent>
      <CardActions>
        <Button onClick={() => handleVideoToggle()}>
          {!isVideoPlaying ? "Play" : "Stop"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default Camera;
