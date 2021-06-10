import { Button, Card, CardActions, CardContent } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import { useAudio } from "../../hooks/useAudio";
import { useVideo } from "../../hooks/useVideo";
import logo from "../../logo.svg";
import { Logger } from "../../utils/logger";
import { Video } from "./CamerStyles";
const CAPTURE_OPTIONS: MediaStreamConstraints = {
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: false,
  },
  video: { facingMode: "environment", width: 450, height: 348 },
};

const Camera = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const audioTracks = useAudio(CAPTURE_OPTIONS, isAudioOn);
  const videoTracks = useVideo(CAPTURE_OPTIONS, isVideoOn);

  /**
   * UseEffect prevents flickering caused by rerendering
   * Toggling of button that causes rerender will caouse
   * flicker due to change in srcObject.
   * To prevent this useEffect is used for both audio and video streamss.
   * */
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = videoTracks
        ? new MediaStream(videoTracks)
        : null;
    }
  }, [videoTracks]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.srcObject = audioTracks
        ? new MediaStream(audioTracks)
        : null;
    }
  }, [audioTracks]);

  /**
   * Handle_*_Toggle Operation toggles the state of specified component
   * Is_*_Playing state stores the operational status of audio/video.
   * When audio or video is ready to play, this state is active/true.
   * */
  const handleVideoToggle = () => {
    if (!isVideoOn) {
      setIsVideoOn(true);
      Logger("Webcam on");
    } else {
      setIsVideoOn(false);
      setIsVideoPlaying(false);
      Logger("Webcam Off");
    }
  };

  const handleAudioToggle = () => {
    if (!isAudioOn) {
      setIsAudioOn(true);
      Logger("Audio On");
    } else {
      setIsAudioOn(false);
      setIsAudioPlaying(false);
      Logger("Audio Off");
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
          // hidden={!isVideoOn}
          poster={logo}
          onCanPlayThrough={() => {
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
        <audio
          onCanPlayThrough={() => {
            setIsAudioPlaying(true);
            audioRef.current?.play().catch((e) => {
              Logger(e);
            });
          }}
          ref={audioRef}
        />
      </CardContent>
      <CardActions>
        <Button
          disabled={!isVideoPlaying && isVideoOn}
          onClick={() => {
            handleVideoToggle();
          }}
        >
          {!isVideoOn ? "Open Webcam" : "Close Webcam"}
        </Button>
        <Button
          disabled={!isAudioPlaying && isAudioOn}
          onClick={() => {
            handleAudioToggle();
          }}
        >
          {!isAudioOn ? "Open Microphone" : "Close Microphone"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default Camera;
