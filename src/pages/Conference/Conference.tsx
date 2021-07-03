// import Paper from "@material-ui/core/Paper";
import { Grid } from "@material-ui/core";
import { useContext, useEffect } from "react";
import BottomBar from "src/components/BottomComponents/Bottombar";
import ThreexComp from "src/components/ThreexComp/ThreexComp";
import VideoPlayer from "src/components/videoplayer/VideoPlayer";
import { useTray } from "src/hooks/useTray";
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
  const { setAr } = useTray();
  const context = useContext(SocketContext);
  const { stream, otherStreams } = context!;

  // const { id } = useParams<{ id: string }>();

  const { toggleWebcam, toggleMicrophone } = useTray();

  useEffect(() => {
    toggleWebcam();
    toggleMicrophone();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
        {setAr ? (
          stream && (
            <Grid item xs={12} md={6} lg={4}>
              <VideoPlayer stream={stream!} muted={true} />
            </Grid>
          )
        ) : (
          <ThreexComp />
        )}
        <ThreexComp />

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
