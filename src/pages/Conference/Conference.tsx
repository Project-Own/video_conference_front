// import Paper from "@material-ui/core/Paper";
import { Grid } from "@material-ui/core";
import { useContext, useEffect } from "react";
import ARPlayer from "src/components/ARPlayer/ARPlayer";
import BottomBar from "src/components/BottomComponents/Bottombar";
import VideoPlayer from "src/components/videoplayer/VideoPlayer";
import { useTray } from "src/hooks/useTray";
import { useWebcam } from "src/hooks/useWebcam";
import { SocketContext } from "src/pages/Context/Context";

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       flexGrow: 1,
//     },
//     main_grid: {
//       height: "88vh",
//       display: "flex",
//       flexFlow: "row wrap",
//     },
//   })
// );

const Conference = () => {
  // const classes = useStyles();

  const context = useContext(SocketContext);
  const { stream, otherStreams } = context!;

  // const { id } = useParams<{ id: string }>();

  const { setState, usingAR } = useTray();
  const { videoTracks } = useWebcam();

  useEffect(() => {
    setState({ type: "webcam", value: true });
    setState({ type: "microphone", value: true });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const videoObj = videoTracks ? new MediaStream(videoTracks) : null;

    // console.log("What");
    if (!usingAR) context.setStream(videoObj!);

    // console.log(usingAR);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usingAR, videoTracks]);

  return (
    <Grid
      item
      container
      xs={12}
      direction="column"
      alignItems="center"
      justify="center"
    >
      <Grid
        item
        container
        xs={12}
        direction="row"
        alignItems="center"
        justify="center"
      >
        {/* <ThreexComp /> */}
        {usingAR ? (
          <Grid item xs={8} md={6} lg={4}>
            <ARPlayer />
          </Grid>
        ) : (
          <Grid item xs={8} md={6} lg={4}>
            <VideoPlayer stream={stream!} muted={true} />
          </Grid>
        )}

        {otherStreams?.map((otherStream) => {
          console.log("Other Stream");
          console.log(otherStream);
          return (
            <Grid item xs={12} md={6} lg={4}>
              <VideoPlayer
                stream={otherStream}
                key={otherStream.id}
                muted={false}
              />
            </Grid>
          );
        })}
      </Grid>

      <BottomBar />
    </Grid>
  );
};

export default Conference;
