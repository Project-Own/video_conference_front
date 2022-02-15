import { Grid } from "@mui/material";
import { FC, useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import BottomBar from "src/components/BottomComponents/BottomBar";
import Layout from "src/components/Layout/Layout";
import VideoPlayer from "src/components/VideoPlayer/VideoPlayer";
import { ConferenceContext } from "src/context/ConferenceContext";
import { useConference } from "src/hooks/useConference";

const Conference: FC = () => {
  const [hideBottomBar, setHideBottomBar] = useState(true);
  const hideTimeout = useRef<NodeJS.Timeout>();
  const { stream, roomName, setRoomName, otherStreams } =
    useContext(ConferenceContext);

  const location = useLocation();
  const room = location.pathname.split("/media-server-room/")[1] ?? "room";

  useEffect(() => {
    if (roomName !== room) setRoomName(room);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useConference();

  return (
    <Layout>
      <div
        onMouseMove={(ev) => {
          if (hideTimeout.current) clearTimeout(hideTimeout.current);
          setHideBottomBar(false);
          hideTimeout.current = setTimeout(() => {
            setHideBottomBar(true);
          }, 10000);
        }}
        style={{ height: "100%", width: "100%" }}
      >
        <Grid container direction="column">
          <Grid item container xs={12} direction="row">
            <Grid item xs={6} md={4} lg={3}>
              {/* <ARPlayer /> */}
              <VideoPlayer stream={stream} muted={true} />
            </Grid>

            {otherStreams?.length! > 0 &&
              otherStreams?.map((otherStream, key) => {
                return (
                  <Grid item key={key} xs={6} md={4} lg={3}>
                    <VideoPlayer
                      stream={otherStream.stream}
                      key={otherStream.id}
                      muted={false}
                    />
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
        {hideBottomBar ? null : <BottomBar />}
      </div>
    </Layout>
  );
};

export default Conference;
