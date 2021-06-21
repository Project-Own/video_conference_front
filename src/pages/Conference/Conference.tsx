// import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { default as Bottombar } from "src/components/BottomComponents/Bottombar";
import { SocketContext } from "src/components/context/Context";
import VideoPlayer from "src/components/videoplayer/VideoPlayer";
import { useTray } from "src/hooks/useTray";

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

  const { id } = useParams<{ id: string }>();

  const { toggleWebcam, toggleMicrophone } = useTray();

  useEffect(() => {
    toggleWebcam();
    toggleMicrophone();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
    // className={classes.root}
    >
      <p>Room Name: {id}</p>
      <Grid
        container
        //  className={classes.main_grid}
      >
        {stream && (
          <Grid item>
            <VideoPlayer stream={stream!} />
          </Grid>
        )}
        {otherStreams?.map((otherStream) => {
          console.log("Other Stream");
          console.log(otherStream);
          return (
            <Grid item>
              <VideoPlayer stream={otherStream} key={otherStream.id} />
            </Grid>
          );
        })}
      </Grid>

      <Grid item xs={12}>
        <Bottombar />
      </Grid>
    </div>
  );
};

export default Conference;
