// import theme from "../../themes/theme";
import { Close, Send } from "@mui/icons-material";
import {
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  List,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { ConferenceContext } from "src/context/ConferenceContext";
import MessageList from "./messageList";

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     text: {
//       fontFamily: "Noto Sans JP",
//       fontStyle: "normal",
//       fontWeight: 500,
//       fontSize: "26px",
//       lineHeight: "52px",
//       textAlign: "center",
//       color: "black",
//     },
//     closeButton: {
//       transition: "transform .25s, opacity .25s",
//       position: "absolute",
//       // top: 4,
//       right: 2,
//       "&:hover": {
//         color: "black",
//         background: "transparent",
//         transform: "rotate(-90deg)",
//       },
//     },
//     chatBox: {
//       height: "81vh",
//       background: "#e5e4e2",
//       width: "296px",
//       borderRadius: "8px 8px 0px 0px",
//       // alignItems: "baseline",
//       padding: "0px 8px 0px 8px",
//       overflow: "auto",
//       overflowWrap: "anywhere",
//       flexDirection: "column-reverse",

//       // flexFlow: "column wrap",
//     },
//     textField: {
//       background: "#e5e4e2",
//       borderRadius: "0px 0px 8px 8px",
//       width: "296px",
//       "&:hover": {
//         color: "#e5e4e2",
//         background: "#e5e4e2",
//       },
//       // height: "40px",
//     },
//   })
// );

const ChatGrid = () => {
  const { toggle } = useContext(ConferenceContext);

  // const [isOpen, setisOpen] = useState(false);

  // const chatDrawer =
  //   (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
  //     setisOpen(open);
  //   };

  const [message, setmessage] = useState([
    { senderId: 1, text: "Hello, Welcome to Virtual meet" },
  ]);
  const [fieldValue, setfieldValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setfieldValue("");
    // console.log(e);
    if (fieldValue) {
      //   console.log(message);
      setmessage([...message, { senderId: 2, text: fieldValue }]);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setfieldValue(e.target.value);
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ padding: "2em" }}
    >
      <Grid container alignItems="center" justifyContent="center">
        <Typography
        // className={classes.text}
        >
          Chat
        </Typography>
        <IconButton
          color="error"
          //  className={classes.closeButton}
          onClick={() => toggle("chat")}
        >
          <Close />
        </IconButton>
      </Grid>

      <Grid
        container
        // className={classes.chatBox}
      >
        <List>
          <MessageList messages={message} />
        </List>
      </Grid>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Divider variant="fullWidth" />
        <TextField
          // className={classes.textField}
          inputProps={{
            style: {
              height: "48px",
              padding: "0 14px",
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  //  className={classes.closeButton}
                  type="submit"
                  color="success"
                >
                  <Send />
                </IconButton>
              </InputAdornment>
            ),
          }}
          size="small"
          value={fieldValue}
          placeholder="Send a message"
          onChange={(e) => {
            handleChange(e);
          }}
        />
      </form>
      <Link color="inherit">Send to</Link>
    </Grid>
  );
};

export default ChatGrid;
