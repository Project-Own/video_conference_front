import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Assignment } from "@material-ui/icons";
import React, { FC, useContext } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { SocketContext } from "src/pages/Context/Context";
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
    // margin: "65px 0",
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

const Host: FC = ({ children }) => {
  const { roomName, setRoomName, joinRoom } = useContext(SocketContext);

  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Paper elevation={10} className={classes.paper}>
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            joinRoom();
          }}
        >
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
                type="submit"
                className={classes.margin}
              >
                Host
              </Button>
              <CopyToClipboard text={roomName}>
                <Button
                  className={classes.margin}
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<Assignment fontSize="large" />}
                >
                  Copy Room Name
                </Button>
              </CopyToClipboard>
            </Grid>
          </Grid>
        </form>
        {children}
      </Paper>
    </Container>
  );
};

export default Host;
