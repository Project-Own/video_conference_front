import { Button, Grid, Typography } from "@material-ui/core";
import { useState } from "react";
import landingPic from "src/assests/landingPic.jpg";
import Combine from "src/components/Combine/combine";







const Landing = () => {

  const [host, sethost] = useState(false);
  return (
    <div>
      <Grid container>
        <Grid item xs={1} />
        <Grid item container direction="column" xs={4}>
          <Grid item style={{ marginLeft: "150px", marginTop: "100px" }}>
            <Typography variant="h4">Virtual Meet</Typography>
          </Grid>

          <Grid item style={{ marginLeft: "120px", marginTop: "15px" }}>
            <Typography variant="h5"> Distance means so little. </Typography>
          </Grid>

          <Grid item style={{ marginLeft: "70px", marginTop: "40px" }}>
            <Typography variant="h6" align="left">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet eu
              at hendrerit metus in. met eu <br />
              Amet eu at hendrerit metus in. Amet eu at hendrerit metus in{" "}
              <br />
              Amet eu at hendrerit metus in. Amet eu at hendrerit metus in.at
              hendrerit metus in.
            </Typography>
          </Grid>

          <Grid
            container
            direction="row"
            spacing={5}
            style={{ marginTop: "25px" }}
          >
            <Grid item style={{ marginLeft: "85px" }}>
              <Button
                variant="contained"
                style={{ backgroundColor: "#F1F7B3" }}
                onClick = {() => {sethost(!host)}}
              >
                Join Meeting
              </Button>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                style={{ backgroundColor: "#CBF8BB" }}
                onClick = {() => {sethost(!host)}}
              >
                Host Meeting
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={2} />
        <Grid item xs={4}>
          {
            host? <Combine/> : <img
            src={landingPic}
            alt="Landing"
            style={{ width: "400px", height: "400px", marginTop: "100px" }}
          />
          }
        </Grid>
      </Grid>
    </div>
  );
};

export default Landing;
