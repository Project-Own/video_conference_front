import { Button } from "@material-ui/core";
import { useContext } from "react";
import { SocketContext } from "../context/Context";
import VideoPlayer from "./VideoPlayer";

const VideoPlayerCollection = () => {
  const context = useContext(SocketContext);
  const { joinRoom, roomName, setRoomName, stream, otherStreams } = context;
  return (
    <>
      <label title="Room Name">Room N</label>
      <input
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        placeholder="Room"
        title="Room Name"
      />
      <p>{roomName}</p>
      <Button onClick={() => joinRoom()}>Set Room</Button>
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
