import { Button, Grid, TextField, Typography, useTheme } from "@mui/material";
import { FC, useContext, useState } from "react";
import { ConferenceContext } from "src/context/ConferenceContext";

const Join: FC = () => {
  const { joinRoom } = useContext(ConferenceContext);
  const [roomName, setRoomName] = useState("");
  const theme = useTheme();
  return (
    <Grid container sx={{ border: `2px solid ${theme.palette.text.primary}` }}>
      <Grid item xs={12} sx={{ padding: "2em" }}>
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
          disabled={roomName === ""}
          color="primary"
          fullWidth
          sx={{ mt: "2em" }}
          onClick={() => joinRoom(roomName)}
        >
          {" "}
          Join
        </Button>
      </Grid>
    </Grid>
  );
};

export default Join;
