import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import { actionRegister } from "../../Redux/actions/actionRegister";
import axios from "axios";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useDispatch } from "react-redux";
import "./login.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  MuiFormLabelRoot: { fontSize: "15px" },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    fontSize: "15px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    fontSize: "15px",
  },
  input: {
    marginBottom: "20px",
    fontSize: "15px",
  },
  center: {
    margin: "auto auto",
  },
}));
const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertStyle, setAlertStyle] = useState("none");

  let login = async (e) => {
    e.preventDefault();
    let userData = await axios
      .post("https://electrohack-server.vercel.app/token/login/admin", {
        email: email,
        password: password,
      })
      .then((user) => {
        console.log(user);
        dispatch(actionRegister(user.data));
        if (user.data.token === undefined) {
          setAlertStyle("block");
          history.push("/login");
        } else {
          setAlertStyle("none");
          history.push("/");
        }
      });
  };

  return (
    <Container className={classes.center} component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate>
          <Grid item xs={12} className={classes.input}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Correo electronico"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Contraseña"
              type="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={login}
          >
            Login
          </Button>
          <Alert severity="error" style={{ display: alertStyle, marginTop: "20px" }}>
            <AlertTitle>Error</AlertTitle>
            Los datos ingresados no son correctos — <strong>Intenta nuevamente!</strong>
          </Alert>
        </form>
      </div>
    </Container>
  );
};

export default Login;
