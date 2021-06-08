import { Button, Card, CardActions, CardContent } from "@material-ui/core";
import { useRef, useState } from "react";
import { useUserMedia } from "../../hooks/useUserMedia";
import logo from "../../logo.svg";
import { Logger } from "../../utils/logger";
import { Video } from "./CamerStyles";
const CAPTURE_OPTIONS: MediaStreamConstraints = {
  audio: true,
  video: { facingMode: "environment" },
};

const Camera = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isWebcamOn, setIsWebcamOn] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const mediaStream = useUserMedia(CAPTURE_OPTIONS, isWebcamOn);
  // const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  // useEffect(() => {
  //   const enableVideoStream = async () => {
  //     try {
  //       const stream = await navigator.mediaDevices.getUserMedia(
  //         CAPTURE_OPTIONS
  //       );
  //       setMediaStream(stream);
  //     } catch (err) {
  //       Logger(err);
  //     }
  //   };
  //   const streamCleanup = () => {
  //     if (!!mediaStream) {
  //       Logger("INside Cleanup");
  //       mediaStream.getTracks().forEach((track) => track.stop());
  //       setMediaStream(null);
  //       if (videoRef.current && videoRef.current.srcObject) {
  //         videoRef.current.srcObject = null;
  //       }
  //     }
  //   };
  //   if (isWebcamOn) {
  //     enableVideoStream();
  //   } else {
  //     Logger("Cleanup");

  //     streamCleanup();
  //   }
  // }, [isWebcamOn]);

  if (!mediaStream && videoRef.current && videoRef.current.srcObject) {
    videoRef.current.srcObject = null;
  }
  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream;
  }

  // if (!mediaStream) {
  //   return (
  //     <Card>
  //       <Typography>
  //         No User Media Found! Trying to Connect to media.
  //       </Typography>
  //     </Card>
  //   );
  // }

  const handleVideoToggle = () => {
    if (!isWebcamOn) {
      setIsWebcamOn(true);
      Logger("Webcam on Camera");
    } else {
      setIsWebcamOn(false);
      setIsVideoPlaying(false);
      Logger("Webcam Off Camera");
    }
  };

  return (
    <Card>
      <CardContent
        style={{
          height: 600,
          width: 600,
        }}
      >
        <Video
          ref={videoRef}
          // hidden={!isWebcamOn}
          poster={logo}
          onCanPlayThrough={() => {
            // videoRef.current?.load();
            setIsVideoPlaying(true);
            videoRef.current?.play().catch((e) => {
              Logger(e);
            });
          }}
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
        <Button
          disabled={!isVideoPlaying && isWebcamOn}
          onClick={() => {
            handleVideoToggle();
          }}
        >
          {!isWebcamOn ? "Open Webcam" : "Close Webcam"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default Camera;
