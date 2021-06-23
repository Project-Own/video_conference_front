import { Button, Grid, Typography } from "@material-ui/core";
import { useState } from "react";
import Host from "src/components/slidebar/Host";
import Join from "src/components/slidebar/Join";

const Landing = () => {
  const [host, setHost] = useState(true);
  return (
    <Grid
      container
      direction="row"
      style={{ width: "100%", height: "100%" }}
      spacing={2}
      justify="center"
      alignItems="center"
    >
      <Grid item xs={1} />
      <Grid
        item
        container
        xs={5}
        direction="row"
        alignItems="center"
        justify="center"
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
            Distance means so little.{" "}
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
            Lorem ipsum dolor sit amet, consectetur adipi scing elit. Amet eu at
            hendrerit metus in. met eu <br />
            Amet eu at hendrerit metus in. Amet eu at hendrerit metus in <br />
            Amet eu at hendrerit metus in. Amet eu at hendrerit metus in.at
            hendrerit metus in. Lorem ipsum dolor sit amet, consectetur adipi
            scing elit. Amet eu at hendrerit metus in. met eu <br />
            Amet eu at hendrerit metus in. Amet eu at hendrerit metus in <br />
            Amet eu at hendrerit metus in. Amet eu at hendrerit metus in.at
            hendrerit metus in. Lorem ipsum dolor sit amet, consectetur adipi
            scing elit. Amet eu at hendrerit metus in. met eu <br />
            Amet eu at hendrerit metus in. Amet eu at hendrerit metus in <br />
            Amet eu at hendrerit metus in. Amet eu at hendrerit metus in.at
            hendrerit metus in.
          </Typography>
        </Grid>

        <Grid
          item
          container
          direction="row"
          spacing={4}
          xs={12}
          style={{ marginTop: "25px" }}
        >
          <Grid
            item
            xs={6}
            //  style={{ marginLeft: "85px" }}
          >
            <Button
              variant="contained"
              style={{ backgroundColor: "#F1F7B3" }}
              onClick={() => {
                setHost(false);
              }}
            >
              Join Meeting
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button
              variant="contained"
              style={{ backgroundColor: "#CBF8BB" }}
              onClick={() => {
                setHost(true);
              }}
            >
              Host Meeting
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={1} />

      <Grid item xs={4}>
        {host ? <Host /> : <Join />}
      </Grid>
      <Grid item xs={1} />
    </Grid>
  );
};

export default Landing;
