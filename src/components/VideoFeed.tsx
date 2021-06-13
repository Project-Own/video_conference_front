import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";

// import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    video_feed: {
      flexGrow: 1,
      width: "49%",
      background: "#2F4F4F",
      border: "6px solid #000000",
      box_sizing: "border-box",
    },
  })
);

const Bottombar = () => {
  const classes = useStyles();
  return <div className={classes.video_feed}>Rohit</div>;
};

export default Bottombar;
