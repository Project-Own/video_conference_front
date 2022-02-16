import { Paper, useTheme } from "@mui/material";
import { FC, useEffect, useRef } from "react";

const VideoPlayer: FC<{
  stream: MediaStream | undefined;
  muted: boolean;
  style?: React.CSSProperties;
  controls?: boolean;
}> = ({ stream, muted, style, controls = true }) => {
  const theme = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);
  console.log(
    "My Style",
    { ...style }

    // videoRef.current?.srcObject &&
    //   (videoRef.current?.srcObject as MediaStream).getVideoTracks()
  );

  useEffect(() => {
    if (!stream) return;
    if (videoRef.current) videoRef.current.srcObject = stream;
  }, [stream]);

  // arStream = useAr(canvasRef)
  // '

  return (
    <Paper
      sx={{
        padding: "10px",
        border: `2px solid ${theme.palette.background.default}`,
        margin: "10px",
      }}
      elevation={8}
    >
      <video
        playsInline
        muted={muted}
        ref={videoRef}
        controls={controls}
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
          height: "100%",
          ...style,
          // transform: `scale(-1,1)`,
        }}
      />
    </Paper>
  );
};

export default VideoPlayer;
