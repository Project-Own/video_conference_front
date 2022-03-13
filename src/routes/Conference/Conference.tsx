import { Close } from "@mui/icons-material";
import { Alert, Button, Grid, IconButton, Typography } from "@mui/material";
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
  const {
    stream,
    roomName,
    setRoomName,
    message,
    otherStreams,
    uri,

    screenShare,
    name,
    peers,
    trainedGesture,
    frame,
    usingTrainedGesture,
    usingGesture,
    gesture,
  } = useContext(ConferenceContext);
  const location = useLocation();
  const room = location.pathname.split("/room/")[1];
  const [open, setOpen] = useState(false);
  useEffect(() => {
    console.log("Context room", roomName);
    console.log("Path room", room);
    if (!roomName && room) {setRoomName(room);
      console.log(room)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(()=>{
    console.log("Check",roomName)
  },[roomName])

  useEffect(() => {
    if (message !== "") setOpen(true);
  }, [message]);
  // console.log("My Stream", stream?.getTracks());
  // otherStreams.forEach((stream) => {
  //   console.log("Other Stream", stream.peerId, stream.stream.getTracks());
  // });

  useConference();

  const handleClose = () => {
    setOpen(false);
  };
  const action = (
    <>
      <Button href={uri.split("mediasoup")[0]} target="_blank">
        Open Server
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <Close fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <Layout>
      {open ? (
        <Alert severity="warning">
          {message} {action}
        </Alert>
      ) : null}
      <Grid
        container
        direction="column"
        sx={{
          width: "100%",
          height: "100%",
          padding: { xs: "2em", md: "4em" },
        }}
        onClick={() => {
          setHideBottomBar((prevValue) => !prevValue);
        }}
        onTouchStart={() => {
          setHideBottomBar((prevValue) => !prevValue);
        }}
        onMouseMove={(ev) => {
          if (hideTimeout.current) clearTimeout(hideTimeout.current);
          setHideBottomBar(false);
          hideTimeout.current = setTimeout(() => {
            setHideBottomBar(true);
          }, 10000);
        }}
        onTouchMove={(ev) => {
          if (hideTimeout.current) clearTimeout(hideTimeout.current);
          setHideBottomBar(false);
          hideTimeout.current = setTimeout(() => {
            setHideBottomBar(true);
          }, 10000);
        }}
      >
        <Grid item container xs={12} direction="row">
          <Grid
            item
            xs={12}
            sm={
              otherStreams.length === 0 ? 12 : otherStreams.length < 3 ? 12 : 6
            }
            md={otherStreams.length === 0 ? 8 : otherStreams.length < 3 ? 6 : 4}
            lg={otherStreams.length === 0 ? 6 : otherStreams.length < 3 ? 6 : 4}
          >
            {/* <ARPlayer /> */}
            <VideoPlayer
              isSelfStream={true}
              stream={stream}
              muted={true}
              style={
                screenShare
                  ? { transform: "scale(1,1)" }
                  : { transform: "scale(-1,1)" }
              }
              controls={false}
              displayName={name}
            />
            {usingTrainedGesture ? (
              <>
                <Typography variant="body2">
                  <b>Frame:</b> {frame.current}
                </Typography>

                <Typography variant="body1">
                  <b>Trained Gesture:</b>
                  {trainedGesture ? trainedGesture : "No gesture"}
                </Typography>
              </>
            ) : null}

            {usingGesture ? (
              <Typography variant="body1">
                <b>Hands Gesture:</b> {gesture ? gesture : "No gesture"}
              </Typography>
            ) : null}
          </Grid>

          {otherStreams?.length! > 0 &&
            otherStreams?.map((otherStream, key) => {
              return (
                <Grid
                  item
                  key={key}
                  xs={12}
                  sm={
                    otherStreams.length === 0
                      ? 12
                      : otherStreams.length < 3
                      ? 12
                      : 6
                  }
                  md={
                    otherStreams.length === 0
                      ? 8
                      : otherStreams.length < 3
                      ? 6
                      : 4
                  }
                  lg={
                    otherStreams.length === 0
                      ? 6
                      : otherStreams.length < 3
                      ? 6
                      : 4
                  }
                >
                  <VideoPlayer
                    isSelfStream={false}
                    stream={otherStream.stream}
                    key={otherStream.id}
                    muted={false}
                    controls={false}
                    displayName={
                      peers[otherStream.peerId]?.name
                        ? peers[otherStream.peerId].name
                        : "Unknown"
                    }
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
            }, 30000);
          }}
        >
          <BottomBar />
        </div>
      )}
    </Layout>
  );
};

export default Conference;
