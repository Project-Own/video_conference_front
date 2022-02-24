import { Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import Host from "src/components/Sidebar/Host";
import Join from "src/components/Sidebar/Join";

const Landing = () => {
  const [host, setHost] = useState(true);
  return (
    <Grid
      container
      direction="row"
      style={{ width: "100%", height: "100%", padding: 32 }}
      spacing={4}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item md={1} />
      <Grid
        item
        container
        md={5}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          item
          xs={12}
          // style={{ marginLeft: "150px", marginTop: "100px" }}
        >
          <Typography variant="h4" align="center">
            Virtual Meet
          </Typography>
        </Grid>

        <Grid
          item
          style={{
            // marginLeft: "120px",
            marginTop: "15px",
          }}
          xs={12}
        >
          <Typography variant="h5" align="center">
            Distance means so little.
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          style={{
            // marginLeft: "70px",
            marginTop: "40px",
          }}
        >
          <Typography variant="h6" align="left">
            Virtual meet is video conferencing app where people can talk with
            each other.
            <br />
            With the help of this app, we can display the image in three
            dimensional. <br />
            We can control the different functionalities using the gestures.{" "}
            <br />
            We can share our screen for presenting our content towards other
            users.
            <br />
            Participant can use the chat features for not interrupting the
            meetings.
          </Typography>
        </Grid>

        <Grid
          item
          container
          direction="row"
          spacing={4}
          md={12}
          style={{ marginTop: "25px" }}
        >
          <Grid
            item
            md={6}
            alignContent="center"
            alignItems="center"

            //  style={{ marginLeft: "85px" }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setHost(false);
              }}
            >
              Join Meeting
            </Button>
          </Grid>

          <Grid item md={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setHost(true);
              }}
            >
              Host Meeting
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={1} />

      <Grid container item md={4}>
        {host ? <Host /> : <Join />}
      </Grid>
      <Grid item md={1} />
    </Grid>
  );
};

export default Landing;
