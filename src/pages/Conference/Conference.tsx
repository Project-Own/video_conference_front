import { Grid } from "@material-ui/core";
import { useContext, useEffect } from "react";
import ARPlayer from "src/components/ARPlayer/ARPlayer";
import BottomBar from "src/components/BottomComponents/Bottombar";
import Camera from "src/components/camera/Camera";
import VideoPlayer from "src/components/videoplayer/VideoPlayer";
import useSocket from "src/pages/Conference/useSocket";
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

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useSocket();
  const context = useContext(SocketContext);
  const { otherStreams } = context!;

  // const { id } = useParams<{ id: string }>();

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
        <Grid item xs={8} md={6} lg={4}>
          <ARPlayer />
        </Grid>

        {otherStreams?.length! > 0 &&
          otherStreams?.map((otherStream, key) => {
            return (
              <Grid key={key} item xs={12} md={6} lg={4}>
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
