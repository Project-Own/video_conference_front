import { ListItemText, Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      fontFamily: "Noto Sans JP",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "14px",
      color: "black",
    },
  })
);

const MessageList = (props: any) => {
  //   const { text, senderId } = props;
  //   console.log(props);
  const classes = useStyles();
  const { messages } = props;
  //   console.log(messages);
  return (
    <>
      {messages.map((msg: any, index: number) => {
        return (
          <>
            <ListItemText>
              <Typography className={classes.text}>
                {" "}
                {index + " : " + msg.text}
              </Typography>
            </ListItemText>
            <Divider variant="fullWidth" />
          </>
        );
      })}
    </>
  );
};

export default MessageList;
