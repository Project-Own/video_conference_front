import { Grid } from "@material-ui/core";
import { current } from "@reduxjs/toolkit";
import { useRef } from "react";
import { useLocation } from "react-router-dom";
import VideoPlayer from "src/components/videoplayer/VideoPlayer";
import { useMediaServer } from "./useMediaServer";

const MediaServerConference = () => {
  const videoContainer = useRef < HTMLDivElement > null;
  const localVideo = useRef < HTMLVideoElement > null;

  const location = useLocation();
  const roomName = location.pathname.split("/media-server-room/")[1];

  console.log(roomName);
  const { otherStreams } = useMediaServer(roomName, localVideo);
  console.log("Other Streams", otherStreams);
  return (
    <div id="video">
      <table className="mainTable">
        <tbody>
          <tr>
            <td className="localColumn">
              <video
                id="localVideo"
                ref={localVideo}
                autoPlay
                className="video"
              ></video>
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <td></td>
          </tr>
        </tbody>
      </table>
      <Grid direction="row">
        {otherStreams?.length > 0 &&
          otherStreams?.map((otherStream, key) => {
            return (
              <Grid key={key} item xs={12} md={6} lg={4}>
                <VideoPlayer
                  stream={otherStream.stream}
                  key={otherStream.id}
                  muted={false}
                />
              </Grid>
            );
          })}
      </Grid>
    </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
};
export default MediaServerConference;
