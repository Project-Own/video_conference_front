import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { useMediaServer } from "./useMediaServer";

const MediaServerConference = () => {
  const videoContainer = useRef<HTMLDivElement>(null);
  const localVideo = useRef<HTMLVideoElement>(null);

  const location = useLocation();
  const roomName = location.pathname.split("/media-server-room/")[1];

  console.log(roomName);
  // useMediaServer(roomName, localVideo, videoContainer);
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
            <td className="remoteColumn">
              <div id="videoContainer" ref={videoContainer}></div>
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
