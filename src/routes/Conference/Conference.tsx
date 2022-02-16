import { Grid, Typography } from "@mui/material";
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
  const { stream, roomName, setRoomName, otherStreams, screenShare, peers } =
    useContext(ConferenceContext);

  const location = useLocation();
  const room = location.pathname.split("/room/")[1];

  useEffect(() => {
    console.log("COntext room", roomName);
    console.log("Path room", room);
    if (!roomName && room) setRoomName(room);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log("My Stream", stream?.getTracks());
  otherStreams.forEach((stream) => {
    console.log("Other Stream", stream.peerId, stream.stream.getTracks());
  });

  useConference();

  return (
    <Layout>
      <Grid
        container
        direction="column"
        sx={{ width: "100%", padding: { xs: "2em", md: "4em" } }}
        onClick={() => {
          setHideBottomBar((prevValue) => !prevValue);
        }}
        onMouseMove={(ev) => {
          if (hideTimeout.current) clearTimeout(hideTimeout.current);
          setHideBottomBar(false);
          hideTimeout.current = setTimeout(() => {
            setHideBottomBar(true);
          }, 10000);
        }}
      >
        <Grid item container xs={12} direction="row">
          <Grid item xs={12} sm={6} md={4} lg={3}>
            {/* <ARPlayer /> */}
            <VideoPlayer
              stream={stream}
              muted={true}
              style={
                screenShare
                  ? { transform: "scale(1,1)" }
                  : { transform: "scale(-1,1)" }
              }
              controls={false}
            />
          </Grid>

          {otherStreams?.length! > 0 &&
            otherStreams?.map((otherStream, key) => {
              return (
                <Grid item key={key} xs={12} sm={6} md={4} lg={3}>
                  <Typography>
                    {peers[otherStream.peerId]?.name
                      ? peers[otherStream.peerId].name
                      : "Unknown"}
                  </Typography>
                  <VideoPlayer
                    stream={otherStream.stream}
                    key={otherStream.id}
                    muted={true}
                  />
                </Grid>
              );
            })}
        </Grid>
      </Grid>
      {hideBottomBar ? null : (
        <div
          onMouseMove={(ev) => {
            if (hideTimeout.current) clearTimeout(hideTimeout.current);
            setHideBottomBar(false);
            hideTimeout.current = setTimeout(() => {
              setHideBottomBar(true);
            }, 10000);
          }}
        >
          <BottomBar />
        </div>
      )}
    </Layout>
  );
};

export default Conference;
