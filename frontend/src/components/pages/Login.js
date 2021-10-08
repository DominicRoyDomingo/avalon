import {
  Box,
  Typography,
  makeStyles,
  TextField,
  Grid,
  Button,
  Snackbar,
  IconButton,
} from "@material-ui/core";
import backgroundImage from "../../assets/img/leather.jpg";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";
import Form from "../Form";
import { Alert } from "@material-ui/lab";
import { Close } from "@material-ui/icons";

const useStyles = makeStyles(() => ({
  login: {
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
  login__register_link: {
    marginTop: 10,
  },
}));

const Login = ({ location }) => {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { isLoading, error, userInfo } = userLogin;

  const deleteProfile = useSelector((state) => state.deleteProfile);
  const { deleteSuccess } = deleteProfile;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(login(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }

    if (deleteSuccess) {
      setIsDeleted(true);
    }
  }, [history, userInfo, redirect, deleteSuccess]);

  return (
    <Box component="section" className={classes.login}>
      <Form isLoading={isLoading} error={error}>
        {
          <Snackbar
            open={isDeleted}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            autoHideDuration={5000}
          >
            <Alert severity="success">
              Your account is now deleted{" "}
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => setIsDeleted(false)}
              >
                <Close fontSize="small" />
              </IconButton>
            </Alert>
          </Snackbar>
        }
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.login__title_container}
        >
          <Typography variant="h5" className={classes.login__title}>
            Sign back in
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
            <Grid container justify="center" alignItems="center">
              <Grid item>
                <Button
                  size="large"
                  className={classes.login__form_button}
                  variant="outlined"
                  type="submit"
                >
                  Login
                </Button>
              </Grid>
            </Grid>
            <Typography>or</Typography>
            <Grid
              container
              justify="center"
              alignItems="center"
              className={classes.login__register_link}
            >
              <Grid item>
                <Typography variant="h6" component="h6">
                  <Link
                    to={
                      redirect
                        ? `/registration?redirect=${redirect}`
                        : "/registration"
                    }
                  >
                    Create an account
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

export default Login;
