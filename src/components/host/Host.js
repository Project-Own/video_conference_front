import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const them = createMuiTheme({
  palette: {
    primary: {
      light: "#C5FFC0",
      main: "#FFFCBD",
      dark: "#000000",
      contrastText: "#fff",
    },
  },
});
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: 558,
    width: 486,
    backgroundColor: them.palette.primary.light,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 20),
    color: them.palette.primary.main,

    // justifyItems: center,
  },
}));

export default function Host() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Host Meeting
        </Typography>
        <form className={classes.form} noValidate>
          {/* <Typography>Name:</Typography> */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Name"
            name="name"
            autoComplete="email"
            autoFocus
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="RoomId"
            name="RoomId"
            autoComplete="number"
            autoFocus
          />

          <Button
            type="submit"
            halfWidth
            alignItems="center"
            variant="contained"
            color="#FFFCBD"
            style={{ color: them.palette.primary.dark, borderRadius: 50 }}
            className={classes.submit}
          >
            Proceed
          </Button>
        </form>
      </div>
    </Container>
  );
}
