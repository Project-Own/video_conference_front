import { Assignment } from "@mui/icons-material";
import { Button, Grid, TextField, Typography, useTheme } from "@mui/material";
import React, { FC, useContext, useState } from "react";
import { ConferenceContext } from "src/context/ConferenceContext";

const Host: FC = () => {
  const { joinRoom } = useContext(ConferenceContext);
  const [roomName, setRoomName] = useState("");
  const [name, setName] = useState("");
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
          onKeyDown={(e) => {
            if (e.key === "Enter" && roomName !== "" && name !== "") {
              joinRoom(roomName, name);
            }
          }}
          fullWidth
        />
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && roomName !== "" && name !== "") {
              joinRoom(roomName, name);
            }
          }}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={roomName === "" || name === ""}
          onClick={() => joinRoom(roomName, name)}
          sx={{ mt: "2em" }}
        >
          Host
        </Button>
        <Button
          sx={{ mt: "2em" }}
          variant="contained"
          color="secondary"
          fullWidth
          startIcon={<Assignment fontSize="large" />}
          onClick={() => {
            navigator.clipboard.writeText(
              roomName ? roomName : ":) Empty string copied"
            );
          }}
        >
          Copy Room Name
        </Button>
      </Grid>
    </Grid>
  );
};

export default Host;
