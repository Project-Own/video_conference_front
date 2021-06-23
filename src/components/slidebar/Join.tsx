import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FC, useContext } from "react";
import { SocketContext } from "../context/Context";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  gridContainer: {
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  container: {
    // width: "550px",
    // margin: "35px 0",
    padding: 0,
    [theme.breakpoints.down("xs")]: {
      width: "80%",
    },
  },
  margin: {
    marginTop: 20,
  },
  padding: {
    padding: 20,
  },
  paper: {
    padding: "10px 20px",
    border: "2px solid black",
  },
}));

const Join: FC = ({ children }) => {
  const { roomName, setRoomName, joinRoom } = useContext(SocketContext);

  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Paper elevation={10} className={classes.paper}>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container className={classes.gridContainer}>
            <Grid item xs={12} className={classes.padding}>
              <Typography gutterBottom variant="h5">
                Gateway to the Room
              </Typography>
              <TextField
                label="Room Name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                fullWidth
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                className={classes.margin}
                onClick={() => joinRoom()}
              >
                Join
              </Button>
            </Grid>
          </Grid>
        </form>
        {children}
      </Paper>
    </Container>
  );
};

export default Join;
