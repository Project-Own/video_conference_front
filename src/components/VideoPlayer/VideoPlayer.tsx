import { VolumeOffRounded, VolumeUpRounded } from "@mui/icons-material";
import { Grid, Icon, Paper, Typography, useTheme } from "@mui/material";
import { FC, useContext, useEffect, useRef, useState } from "react";
import { UIContext } from "src/context/UIContext";

const VideoPlayer: FC<{
  isSelfStream: boolean;
  stream: MediaStream | undefined;
  muted: boolean;
  displayName: string;
  style?: React.CSSProperties;
  controls?: boolean;
}> = ({
  stream,
  muted,
  isSelfStream = false,
  style,
  displayName = "Unknown",
  controls = true,
}) => {
  const theme = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { themeMode } = useContext(UIContext);

  const audioTimeout = useRef<NodeJS.Timeout>();
  const audioTime = useRef<number>();
  const videoTime = useRef<number>();
  const videoTimeout = useRef<NodeJS.Timeout>();
  const [hideAudio, setHideAudio] = useState(false);
  const [hideVideo, setHideVideo] = useState(true);

  useEffect(() => {
    if (!stream) return;
    const videoTracks = stream.getVideoTracks();
    const audioTracks = stream.getAudioTracks();

    if (videoTracks && videoTracks.length > 0) {
      if (videoRef.current)
        videoRef.current.srcObject = new MediaStream([videoTracks[0]]);
    } else {
      setHideVideo(true);
    }

    if (audioTracks && audioTracks.length > 0) {
      if (audioRef.current)
        audioRef.current.srcObject = new MediaStream([audioTracks[0]]);
    } else {
      setHideAudio(true);
    }
  }, [stream]);

  // console.log("HIde Video", hideVideo);

  return (
    <Paper
      // className="gradient"
      sx={{
        padding: "10px",
        border: `2px solid ${theme.palette.background.default}`,
      }}
      elevation={8}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          display: !hideVideo ? "block" : "none",
        }}
      >
        <Grid item>
          <video
            playsInline
            muted={true}
            ref={videoRef}
            controls={controls}
            autoPlay
            onTimeUpdate={(ev) => {
              // let duration = 0;

              if (videoTime.current) {
                // duration = ev.currentTarget.currentTime - videoTime.current;
              }
              videoTime.current = ev.currentTarget.currentTime;

              // console.log(duration);
              setHideVideo(false);
              if (videoTimeout.current) clearTimeout(videoTimeout.current);

              videoTimeout.current = setTimeout(() => {
                setHideVideo(true);
              }, 1000);
              // if (hideVideo) {
              //   if (duration > 0.25) {
              //     setTimeout(() => {
              //       setHideVideo(false);
              //     }, 4000);
              //   }
              // } else {
              //   if (duration < 0.25)
              //     videoTimeout.current = setTimeout(() => {
              //       setHideVideo(true);
              //     }, 1000);
              // }
            }}
            onCanPlay={() => {
              try {
                videoRef.current?.play();
              } catch (error) {
                console.log(error);
              }
            }}
            // poster="https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png"
            style={{
              width: "100%",
              height: "100%",
              ...style,
              // transform: `scale(-1,1)`,
            }}
            onDoubleClick={(ev) => {
              ev.currentTarget.requestFullscreen();
            }}
          />
        </Grid>
      </Grid>

      <Grid
        container
        sx={{
          height: "25em",
          width: "100%",
          background: `${
            themeMode === "light"
              ? theme.palette.primary.light
              : theme.palette.primary.dark
          }`,
          display: hideVideo ? "inside" : "none",
        }}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item>
          <Typography color="aliceblue" variant="h2">
            {displayName.charAt(0).toUpperCase() + displayName.slice(1)}
            {isSelfStream ? null : !hideAudio ? (
              <Icon fontSize="inherit">
                <VolumeUpRounded />
              </Icon>
            ) : (
              <Icon fontSize="inherit">
                <VolumeOffRounded />
              </Icon>
            )}
          </Typography>
        </Grid>
      </Grid>

      <audio
        // controls
        onTimeUpdate={(ev) => {
          let duration = 0;

          if (audioTime.current) {
            duration = ev.currentTarget.currentTime - audioTime.current;
          }
          audioTime.current = ev.currentTarget.currentTime;

          // console.log(duration);
          if (duration > 0.23 && duration < 0.26) {
            setHideAudio(false);
            if (audioTimeout.current) clearTimeout(audioTimeout.current);
          }

          if (hideAudio) {
            if (duration > 0.25) {
              setTimeout(() => {
                setHideAudio(false);
              }, 5000);
            }
          } else {
            if (duration < 0.25)
              audioTimeout.current = setTimeout(() => {
                setHideAudio(true);
              }, 1000);
          }
        }}
        playsInline
        muted={muted}
        ref={audioRef}
        autoPlay
        onCanPlay={() => {
          try {
            audioRef.current?.play();
          } catch (error) {
            console.log(error);
          }
        }}
      />
    </Paper>
  );
};

export default VideoPlayer;
