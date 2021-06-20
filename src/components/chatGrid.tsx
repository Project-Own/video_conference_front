import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import SendIcon from "@material-ui/icons/Send";
import React, { useState } from "react";
import { useTray } from "../hooks/useTray";
import MessageList from "./messageList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      fontFamily: "Noto Sans JP",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "26px",
      lineHeight: "52px",
      textAlign: "center",
      color: "black",
    },
    closeButton: {
      transition: "transform .25s, opacity .25s",
      position: "absolute",
      // top: 4,
      right: 2,
      "&:hover": {
        color: "black",
        background: "transparent",
        transform: "rotate(-90deg)",
      },
    },
    chatBox: {
      height: "81vh",
      background: "#e5e4e2",
      width: "296px",
      borderRadius: "8px 8px 0px 0px",
      // alignItems: "baseline",
      padding: "0px 8px 0px 8px",
      overflow: "auto",
      overflowWrap: "anywhere",
      flexDirection: "column-reverse",
      // flexFlow: "column wrap",
    },
    textField: {
      background: "#e5e4e2",
      borderRadius: "0px 0px 8px 8px",
      width: "296px",
      "&:hover": {
        color: "#e5e4e2",
        background: "#e5e4e2",
      },
      // height: "40px",
    },
  })
);

const ChatGrid = () => {
  const { toggleChat } = useTray();
  const classes = useStyles();
  // const [isOpen, setisOpen] = useState(false);

  // const chatDrawer =
  //   (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
  //     setisOpen(open);
  //   };

  const [message, setmessage] = useState([
    { senderId: 1, text: "Hello, Welcome to Virtual meet" },
  ]);
  const [fieldValue, setfieldValue] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setfieldValue("");
    // console.log(e);
    if (fieldValue) {
      //   console.log(message);
      setmessage([...message, { senderId: 2, text: fieldValue }]);
    }
  };

  const handleChange = (e: any) => {
    setfieldValue(e.target.value);
  };

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid container justify="center" alignItems="center">
        <Typography className={classes.text}>Chat</Typography>
        <IconButton className={classes.closeButton} onClick={toggleChat}>
          <CloseIcon />
        </IconButton>
      </Grid>

      <Grid container className={classes.chatBox}>
        <List>
          <MessageList messages={message} />
        </List>
      </Grid>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Divider variant="fullWidth" />
        <TextField
          className={classes.textField}
          inputProps={{
            style: {
              height: "48px",
              padding: "0 14px",
            },
          }}
          InputProps={{
            disableUnderline: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  className={classes.closeButton}
                  onClick={handleSubmit}
                >
                  <SendIcon />
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
