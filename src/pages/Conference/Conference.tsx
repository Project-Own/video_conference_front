// import Paper from "@material-ui/core/Paper";
import { Grid } from "@material-ui/core";
import React, { useContext, useEffect, useRef } from "react";
import BottomBar from "src/components/BottomComponents/Bottombar";
import { useThree } from "src/components/ThreexComp/useThree";
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
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const df = useRef<HTMLElement | null>(null);

  const ar = useThree(canvasRef.current);
  console.log(df);
  // const { setAr } = useTray();
  const context = useContext(SocketContext);
  const { stream, otherStreams } = context!;

  // const { id } = useParams<{ id: string }>();

  const { toggleWebcam, toggleMicrophone } = useTray();

  useEffect(() => {
    toggleWebcam();
    toggleMicrophone();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  <canvas
    id="c1"
    className="c"
    style={{ width: "800px", height: "800px" }}
    // ref={(mount) => {
    //   this.mount = mount;
    // }}
    ref={canvasRef}
  ></canvas>;
  <button ref={df}>dsdfdf</button>;
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
        {/* {setAr ? (
          stream && (
            <Grid item xs={12} md={6} lg={4}>
              <VideoPlayer stream={stream!} muted={true} />
            </Grid>
          )
        ) : (
          <ThreexComp />
        )}
        <ThreexComp /> */}
        ar && (
        <Grid item xs={12} md={6} lg={4}>
          <VideoPlayer stream={ar!} muted={true} />
        </Grid>
        )
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
