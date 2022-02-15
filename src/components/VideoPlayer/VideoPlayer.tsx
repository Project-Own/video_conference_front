import { Paper, useTheme } from "@mui/material";
import { FC, useEffect, useRef } from "react";

const VideoPlayer: FC<{ stream: MediaStream | undefined; muted: boolean }> = ({
  stream,
  muted,
}) => {
  const theme = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    console.log("My Stream");
    if (!stream) return;
    console.log(stream.getTracks());
    if (videoRef.current) videoRef.current.srcObject = stream;
  }, [stream]);

  // arStream = useAr(canvasRef)
  // '

  return (
    <Paper
      sx={{
        padding: "10px",
        border: `2px solid ${theme.palette.text}`,
        margin: "10px",
      }}
    >
      <video
        playsInline
        muted={muted}
        ref={videoRef}
        controls
        autoPlay
        onCanPlay={() => {
          try {
            videoRef.current?.play();
          } catch (error) {
            console.log(error);
          }
        }}
        poster="https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png"
        style={{
          width: "100%",
          // transform: `scale(-1,1)`,
        }}
      />
    </Paper>
  );
};

export default VideoPlayer;
