import { Close, Search } from "@mui/icons-material";
import {
  Grid,
  IconButton,
  InputAdornment,
  List,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { ConferenceContext } from "src/context/ConferenceContext";
import ParticipantList from "./participantList";

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
//         transform: "rotate(90deg)",
//       },
//     },
//     participantBox: {
//       marginTop: "20px",
//     },
//     textField: {
//       background: "#e5e4e2",
//       borderRadius: "12px",
//       width: "254px",
//       "&:hover": {
//         color: "#e5e4e2",
//         background: "#e5e4e2",
//       },
//       // height: "40px",
//     },
//   })
// );

const ParticipantGrid = () => {
  const { toggle, peers } = useContext(ConferenceContext);

  // const [isOpen, setisOpen] = useState(false);

  // const participantDrawer =
  //   (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
  //     setisOpen(open);
  //   };
  // const dummy_participants = [
  //   {
  //     id: 1,
  //     name: "Nirjal Prajapati",
  //   },
  //   {
  //     id: 2,
  //     name: "Sahas Prajapati",
  //   },
  //   {
  //     id: 3,
  //     name: "Nirajan Prajapati",
  //   },
  //   {
  //     id: 4,
  //     name: "Rohit Prajapati",
  //   },
  // ];
  //   const [name, setname] = useState([{ id: 1, name: "Nirjal Prajapati" }]);
  const [fieldValue, setfieldValue] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setfieldValue("");
    // console.log(e);
  };

  //   setname([...name, { id: 2, name: fieldValue }]);

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
          Participant(s)
        </Typography>
        <IconButton
          // className={classes.closeButton}
          color="error"
          onClick={() => toggle("participant")}
        >
          <Close />
        </IconButton>
      </Grid>
      <form noValidate autoComplete="off" onSubmit={handleSearch}>
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
                <IconButton type="submit">
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
          size="small"
          value={fieldValue}
          placeholder="Search"
          onChange={(e) => {
            handleChange(e);
          }}
        />
      </form>
      <List
      // className={classes.participantBox}
      >
        <ParticipantList participants={Object.keys(peers)} />
      </List>
    </Grid>
  );
};

export default ParticipantGrid;
