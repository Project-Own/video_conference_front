import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import List from "@material-ui/core/List";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import React, { useState } from "react";
import { useTray } from "../hooks/useTray";
import ParticipantList from "./participantList";

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
        transform: "rotate(90deg)",
      },
    },
    participantBox: {
      marginTop: "20px",
    },
    textField: {
      background: "#e5e4e2",
      borderRadius: "12px",
      width: "254px",
      "&:hover": {
        color: "#e5e4e2",
        background: "#e5e4e2",
      },
      // height: "40px",
    },
  })
);

const ParticipantGrid = () => {
  const { toggleParticipant } = useTray();
  const classes = useStyles();
  // const [isOpen, setisOpen] = useState(false);

  // const participantDrawer =
  //   (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
  //     setisOpen(open);
  //   };
  const dummy_participants = [
    {
      id: 1,
      name: "Nirjal Prajapati",
    },
    {
      id: 2,
      name: "Sahas Prajapati",
    },
    {
      id: 3,
      name: "Nirajan Prajapati",
    },
    {
      id: 4,
      name: "Rohit Prajapati",
    },
  ];
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
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid container justify="center" alignItems="center">
        <Typography className={classes.text}>Participant(s)</Typography>
        <IconButton className={classes.closeButton} onClick={toggleParticipant}>
          <CloseIcon />
        </IconButton>
      </Grid>
      <form noValidate autoComplete="off" onSubmit={handleSearch}>
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
                <IconButton type="submit">
                  <SearchIcon />
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
      <List className={classes.participantBox}>
        <ParticipantList participants={dummy_participants} />
      </List>
    </Grid>
  );
};

export default ParticipantGrid;
