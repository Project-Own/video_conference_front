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

export interface MessageInterface {
  user: string;
  text: string;
}

const MessageList: FC<{ messages: MessageInterface[]}> = ({ messages }) => {
  //   const { text, senderId } = props;
  // console.log(props);
  // const classes = useStyles();
  // const messages = props;
  // console.log(messages);
 // const { toggle,name,roomName } = useContext(ConferenceContext);

  return (
    <>
      {messages.map((msg: MessageInterface, index: number) => {
        return (
          <div key={index}>
            <ListItemText>
              <Typography

              // lassName={classes.text}
              >
                {msg.user+ " :: " + msg.text}
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
