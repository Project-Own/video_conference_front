import { ListItemText, Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FC } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      fontFamily: "Noto Sans JP",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "16px",
      color: "black",
    },
  })
);

interface participantInterface {
  id: number;
  name: string;
}

const ParticipantList: FC<{ participants: participantInterface[] }> = ({
  participants,
}) => {
  //   const { text, senderId } = props;
  //   console.log(props);
  const classes = useStyles();
  // const { participants } = props;
  //   console.log(participants);
  return (
    <>
      {participants.map((participant: participantInterface, index: number) => {
        return (
          <>
            <ListItemText style={{ margin: "12px" }}>
              <Typography className={classes.text}>
                {participant.id + ". " + participant.name}
              </Typography>
            </ListItemText>
            <Divider variant="fullWidth" />
          </>
        );
      })}
    </>
  );
};

export default ParticipantList;