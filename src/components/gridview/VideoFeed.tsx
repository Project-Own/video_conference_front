import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useContext } from "react";
import { SocketContext } from "../context/Context";
import VideoPlayer from "../videoplayer/VideoPlayer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    video_feed: {
      flexGrow: 1,
      width: "49%",
      background: "#2F4F4F",
      border: "6px solid #000000",
      box_sizing: "border-box",
    },
  })
);

const VideoFeed = () => {
  const classes = useStyles();
  const context = useContext(SocketContext);
  const {
    // name, callAccepted, callEnded,
    stream,
    // otherStreams,
    //  , call
  } = context;

  // const classes = useStyles();
  return (
    <div className={classes.video_feed}>
      {stream && <VideoPlayer stream={stream!} />}
    </div>
  );
};

export default VideoFeed;
