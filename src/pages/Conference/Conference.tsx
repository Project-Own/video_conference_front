// import Paper from "@material-ui/core/Paper";
import { Grid } from "@material-ui/core";
import { useContext, useEffect } from "react";
import ARPlayer from "src/components/ARPlayer/ARPlayer";
import useSocket from "src/components/ARPlayer/useSocket";
import BottomBar from "src/components/BottomComponents/Bottombar";
import VideoPlayer from "src/components/videoplayer/VideoPlayer";
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

        {otherStreams?.map((otherStream) => {
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
