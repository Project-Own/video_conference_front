import { Divider, ListItemText, Typography } from "@mui/material";
import { FC } from "react";

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     text: {
//       fontFamily: "Noto Sans JP",
//       fontStyle: "normal",
//       fontWeight: 500,
//       fontSize: "14px",
//       color: "black",
//     },
//   })
// );

interface messageInterface {
  senderId: number;
  text: string;
}

const MessageList: FC<{ messages: messageInterface[] }> = ({ messages }) => {
  //   const { text, senderId } = props;
  // console.log(props);
  // const classes = useStyles();
  // const messages = props;
  // console.log(messages);
  return (
    <>
      {messages.map((msg: messageInterface, index: number) => {
        return (
          <div key={index}>
            <ListItemText>
              <Typography

              // lassName={classes.text}
              >
                {index + " : " + msg.text}
              </Typography>
            </ListItemText>
            <Divider variant="fullWidth" />
          </div>
        );
      })}
    </>
  );
};

export default MessageList;
