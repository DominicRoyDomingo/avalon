import {
  Box,
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Form from "../Form";
import backgroundImage from "../../assets/img/shirts.jpg";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";
import Message from "../Message";

const useStyles = makeStyles(() => ({
  register: {
    margin: "auto",
    height: "93.5vh",
    background: `url(${backgroundImage}) rgba(0, 0, 0, 0.6)`,
    backgroundSize: "cover",
    backgroundBlendMode: "multiply",
    backgroundPosition: "right",
    padding: 50,
  },
  login__title_container: {
    marginBottom: 30,
  },
  login__title: {
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  login__form_button: {
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
  login__forgot_link: {
    marginTop: 10,
  },
}));

const Registration = ({ location }) => {
  const classes = useStyles();
  const history = useHistory();
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { isLoading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else dispatch(register(name, email, password));
  };

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  return (
    <Box component="section" className={classes.register}>
      <Form isLoading={isLoading} error={error}>
        {message && <Message severity="error">{message}</Message>}
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.login__title_container}
        >
          <Typography variant="h5" className={classes.login__title}>
            Getting Started
          </Typography>
        </Grid>
        <Box
          component="form"
          className={classes.login__form}
          noValidate
          autoComplete="off"
          onSubmit={(event) => handleSubmit(event)}
        >
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.login__form_container}
            spacing={2}
          >
            <Grid item xs={12}>
              <TextField
                type="email"
                label="Email"
                variant="outlined"
                className={classes.login__form_email}
                color="secondary"
                fullWidth
                onChange={(event) => setEmail(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="password"
                label="Password"
                variant="outlined"
                className={classes.login__form_password}
                color="secondary"
                fullWidth
                onChange={(event) => setPassword(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="password"
                label="Confirm Password"
                variant="outlined"
                className={classes.login__form_password}
                color="secondary"
                fullWidth
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                label="Name"
                variant="outlined"
                className={classes.login__form_name}
                color="secondary"
                fullWidth
                onChange={(event) => setName(event.target.value)}
              />
            </Grid>
            <Grid container justify="center" alignItems="center">
              <Grid item>
                <Button
                  size="large"
                  className={classes.login__form_button}
                  variant="outlined"
                  type="submit"
                >
                  Register
                </Button>
              </Grid>
            </Grid>
            <Typography>or</Typography>
            <Grid
              container
              justify="center"
              alignItems="center"
              className={classes.login__forgot_link}
            >
              <Grid item>
                <Typography variant="h6" component="h6">
                  <Link
                    to={redirect ? `/login?redirect=${redirect}` : "/login"}
                  >
                    Sign back in
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Form>
    </Box>
  );
};

export default Registration;
