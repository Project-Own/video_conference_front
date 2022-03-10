import {
  Button,
  Card,
  CardActions,
  CardMedia,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import Host from "src/components/Sidebar/Host";
import Join from "src/components/Sidebar/Join";
import { UIContext } from "src/context/UIContext";

const Landing = () => {
  const { themeMode } = useContext(UIContext);

  const [host, setHost] = useState(true);
  return (
    <Grid
      container
      direction="row"
      style={{ width: "100%", height: "100%", padding: 32 }}
      spacing={6}
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
          <Typography variant="h2" align="center">
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
          <Typography variant="h4" align="center">
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
          <Typography variant="h6" align="justify">
            Virtual meet is a video conferencing app where people can talk with
            each other. With this app, 3D model can be displayed in augmented
            reality. Gestures can be used to control different functionalities.
            Screen sharing can be done for presenting content towards other
            users. Participant can use the chat feature for communication.
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

      <Grid
        container
        item
        md={12}
        spacing={8}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Augmented Reality
          </Typography>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card
            style={{
              borderRadius: "1em",
            }}
          >
            <CardMedia
              component="img"
              width="100%"
              image="https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/hiro.png"
              alt="Hiro Marker"
            />

            <CardActions>
              <Button
                href="https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/hiro.png"
                target="_blank"
              >
                Download
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={6} md={4}>
          <Card
            style={{
              borderRadius: "1em",
            }}
          >
            <CardMedia
              component="img"
              width="100%"
              image={`${process.env.PUBLIC_URL}/AR_edit.png`}
              alt="AR on Android Marker"
            />
          </Card>
        </Grid>

        <Grid item direction="column" xs={6} md={4}>
          <Card
            style={{
              borderRadius: "1em",
            }}
          >
            <CardMedia
              component="img"
              width="100%"
              image={`${process.env.PUBLIC_URL}/AR_paper_edit.png`}
              alt="AR on Paper Marker"
            />
          </Card>
        </Grid>
      </Grid>

      <Grid
        container
        item
        md={12}
        spacing={8}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Single Image Gesture
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <img
            style={{
              borderRadius: "1em",
            }}
            width="100%"
            src={`${process.env.PUBLIC_URL}${
              themeMode === "light"
                ? "/Gesture_Light_1.png"
                : "/Gesture_Dark_1.png"
            }`}
            alt="Gesture"
          />
          {/* <img
            src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
            width="100%"
            alt=""
          /> */}
        </Grid>
        <Grid item xs={12} md={4}>
          <List>
            <ListItem>
              👌 <b>Movement in Y axis</b> - AR Model Rotation in Y axis
            </ListItem>
            <ListItem>
              👌 <b>Movement in X axis</b> - AR Model Rotation in X axis
            </ListItem>
            <ListItem>
              ✌ <b>Movement in X axis</b> - Scale AR Model
            </ListItem>
            <ListItem>
              🤘 <b>Movement in X axis</b> - Reset Scale and Rotation
            </ListItem>
            <ListItem>
              🤙 <b>Stop AR Model </b>
            </ListItem>
            <ListItem>
              👆 <b>Start AR Model</b>
            </ListItem>
          </List>
        </Grid>
      </Grid>

      <Grid
        container
        item
        md={12}
        spacing={8}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Image Sequence Gesture
          </Typography>
        </Grid>

        <Grid item xs={12} md={4}>
          <List>
            <ListItem>
              <b>Swipe Left</b> - Open Settings
            </ListItem>
            <ListItem>
              <b>Swipe Right</b> - Close Settings
            </ListItem>
            <ListItem>
              <b>Swipe Up</b> - Turn On Microphone
            </ListItem>
            <ListItem>
              <b>Swipe Down</b> - Turn Off Microphone
            </ListItem>
            <ListItem>
              <b>Zoom In with Two Fingers</b> - Close Chat
            </ListItem>
            <ListItem>
              <b>Zoom Out with Two Fingers</b> - Open Chat
            </ListItem>
          </List>
        </Grid>

        <Grid item xs={12} md={6}>
          <img
            style={{
              borderRadius: "1em",
            }}
            width="100%"
            src={`${process.env.PUBLIC_URL}${
              themeMode === "light"
                ? "/Gesture_Light_2.png"
                : "/Gesture_Dark_2.png"
            }`}
            alt="Gesture"
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Landing;
