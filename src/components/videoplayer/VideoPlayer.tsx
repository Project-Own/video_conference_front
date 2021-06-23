import { makeStyles } from "@material-ui/core";
import { FC, useContext, useEffect, useRef } from "react";
import { SocketContext } from "../context/Context";

const useStyles = makeStyles((theme) => ({
  video: {
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      width: "100",
      height: "100%",
    },
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

const VideoPlayer: FC<{ stream: MediaStream }> = ({ stream }) => {
  const context = useContext(SocketContext);

  const classes = useStyles();

  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current) videoRef.current.srcObject = stream;
  }, [stream]);

  return (
    // <Paper className={classes.paper}>
    //   <Typography variant="h5" gutterBottom>
    //     {context?.name || "Name"}
    //   </Typography>
    <video
      playsInline
      // muted

      ref={videoRef}
      autoPlay
      onCanPlay={() => {
        videoRef.current?.play();
      }}
      placeholder="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngfind.com%2Fmpng%2FhJmwxix_image-placeholder-png-user-profile-placeholder-image-png%2F&psig=AOvVaw0iiVcShtJUBhqjR9tTaNjv&ust=1624288437068000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCNiLmo3ApvECFQAAAAAdAAAAABAI"
      className={classes.video}
    />
    // </Paper>
  );
};

export default VideoPlayer;
