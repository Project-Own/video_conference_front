import { useContext } from "react";
import { SocketContext } from "../context/Context";
import VideoPlayer from "./VideoPlayer";

const VideoPlayerCollection = () => {
  const context = useContext(SocketContext);
  const {
    // name, callAccepted, callEnded,
    stream,
    otherStreams,
    //  , call
  } = context;

  console.log("Stream");
  console.log(stream);

  return (
    <>
      {stream && <VideoPlayer stream={stream!} />}
      {otherStreams?.map((otherStream) => {
        console.log("Other Stream");
        console.log(otherStream);
        return <VideoPlayer stream={otherStream} key={otherStream.id} />;
      })}
    </>
  );
};

export default VideoPlayerCollection;
