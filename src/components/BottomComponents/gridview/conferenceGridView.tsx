import { Grid } from "@mui/material";
import { useContext } from "react";
import { ConferenceContext } from "src/context/ConferenceContext";
import BottomBar from "../BottomBar";
import VideoFeed from "./VideoFeed";

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       // flexGrow: 1,
//       // height: "100vh",
//       height: "100%",
//       minHeight: "100%",
//       background: "red",
//       position: "relative",
//     },
//     main_grid: {
//       // height: "80vh",
//       display: "flex",
//       flexFlow: "row wrap",
//       flex: 1,
//       background: "blue",
//     },
//   })
// );

const ConferenceGridLayout = () => {
  const context = useContext(ConferenceContext);

  return (
    <Grid container direction="row">
      <Grid
        item
        container
        xs={2}
        // className={classes.main_grid}
      >
        <VideoFeed />
      </Grid>

      <Grid item container>
        <BottomBar />
      </Grid>
    </Grid>
  );
};

export default ConferenceGridLayout;
