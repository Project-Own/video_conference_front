import { Divider, ListItemText, Typography } from "@mui/material";
import { FC, useContext } from "react";
import { ConferenceContext } from "src/context/ConferenceContext";

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     text: {
//       fontFamily: "Noto Sans JP",
//       fontStyle: "normal",
//       fontWeight: 500,
//       fontSize: "16px",
//       color: "black",
//     },
//   })
// );

const ParticipantList: FC<{ participants: string[] }> = ({ participants }) => {
  //   const { text, senderId } = props;
  //   console.log(props);
  // const { participants } = props;
  //   console.log(participants);
  const { peers, name } = useContext(ConferenceContext);

  return (
    <>
      {participants.map((participant: string, index: number) => {
        return (
          <div key={index}>
            <ListItemText style={{ margin: "12px" }}>
              <Typography>
                {index + 1 + ". " + peers[participant].name}
              </Typography>
            </ListItemText>
            <Divider variant="fullWidth" />
          </div>
        );
      })}
      <div>
        <ListItemText style={{ margin: "12px" }}>
          <Typography>{participants.length + 1 + ". " + name}</Typography>
        </ListItemText>
        <Divider variant="fullWidth" />
      </div>
    </>
  );
};

export default ParticipantList;
