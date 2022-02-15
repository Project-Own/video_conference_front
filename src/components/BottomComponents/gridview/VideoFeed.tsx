import { useContext } from "react";
import VideoPlayer from "src/components/VideoPlayer/VideoPlayer";
import { ConferenceContext } from "src/context/ConferenceContext";

const VideoFeed = () => {
  // const classes = useStyles();
  const { stream } = useContext(ConferenceContext);

  return <>{stream && <VideoPlayer stream={stream!} muted={true} />}</>;
};

export default VideoFeed;
