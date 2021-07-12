import { makeStyles, Paper } from "@material-ui/core";
import { FC, useEffect, useRef } from "react";
const useStyles = makeStyles((theme) => ({
  video: {
    width: "100%",
    // [theme.breakpoints.down("xs")]: {
    //   width: "300px",
    // },
  },
  gridContainer: {
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  paper: {
    padding: "10px",
    border: "2px solid black",
    margin: "10px",
  },
}));

const VideoPlayer: FC<{ stream: MediaStream; muted: boolean }> = ({
  stream,
  muted,
}) => {
  const classes = useStyles();
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    console.log("peerStream");
    console.log(stream.getTracks());
    if (videoRef.current) videoRef.current.srcObject = stream;
  }, [stream]);

  return (
    <Paper className={classes.paper}>
      <video
        playsInline
        muted={muted}
        ref={videoRef}
        autoPlay
        onCanPlay={() => {
          try {
            videoRef.current?.play();
          } catch (error) {
            console.log(error);
          }
        }}
        poster="https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png"
        className={classes.video}
        style={{
          transform: `scale(-1,1)`,
        }}
      />
    </Paper>
  );
};

export default VideoPlayer;
