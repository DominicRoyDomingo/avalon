import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  Avatar,
  Button,
  CardActions,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from "@material-ui/core";
import { blue, red } from "@material-ui/core/colors";
import { Close } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Form from "../Form";
import Message from "../Message";
import {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  logout,
} from "../../actions/userActions";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";

const useStyles = makeStyles(() => ({
  profile__container: {
    backgroundColor: "#e7ffff",
  },
  profile__avatar: {
    width: 100,
    height: 100,
    margin: "30px auto",
    fontSize: 60,
  },
  profile__text: {
    textAlign: "center",
  },
  update__form_container: {
    "& > div": {
      width: "50%",
    },
  },
  update__form: {
    marginTop: 30,
  },
}));

const Profile = () => {
  const classes = useStyles();
  const history = useHistory();
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfile = useSelector((state) => state.userProfile);
  const { isLoading, error, user } = userProfile;

  const updateProfile = useSelector((state) => state.updateProfile);
  const { success } = updateProfile;

  const handleUpdateDialog = () => {
    setIsUpdateOpen(true);
  };

  const handleUpdate = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  const handleDelete = () => {
    dispatch(deleteUserProfile());
    dispatch(logout());
    history.push("/login");
  };

  useEffect(() => {
    if (!!!userInfo) {
      history.push("/login");
    } else {
      if (!user.name || !user || success) {
        dispatch({ type: UPDATE_PROFILE_RESET });
        dispatch(getUserProfile("profile"));
        setIsUpdateOpen(false);
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [userInfo, history, dispatch, user, success]);

  return (
    <Box component="section">
      <Grid container alignContent="center" justify="center" spacing={10}>
        <Grid item xs={3}>
          <Card elevation={5} className={classes.profile__container}>
            <CardContent className={classes.profile__container_content}>
              <Avatar className={classes.profile__avatar}>
                {!!userInfo ? userInfo.name[0] : null}
              </Avatar>
              <Typography className={classes.profile__text} variant="h4">
                {!!userInfo ? userInfo.name : null}
              </Typography>
              <Typography className={classes.profile__text} variant="h6">
                {!!userInfo ? userInfo.email : null}
              </Typography>
            </CardContent>
            <Divider />
            <CardActions>
              <Grid container justify="space-between">
                <Grid item>
                  <Button
                    style={{ color: blue[800] }}
                    onClick={handleUpdateDialog}
                  >
                    Edit Profile
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    style={{ color: red[800], borderColor: red[800] }}
                    variant="outlined"
                    onClick={() => setIsDeleteOpen(true)}
                  >
                    Delete Account
                  </Button>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={isUpdateOpen}>
        <DialogTitle>
          <Grid container justify="space-between">
            <Grid item>Update Profile</Grid>
            <Grid item>
              <IconButton size="small" onClick={() => setIsUpdateOpen(false)}>
                <Close />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <Divider />
        <DialogContent className={classes.update__form_container}>
          <Form isLoading={isLoading} error={error}>
            {message && <Message severity="error">{message}</Message>}
            <Box
              component="form"
              className={classes.update__form}
              noValidate
              autoComplete="off"
              onSubmit={(event) => handleUpdate(event)}
            >
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                className={classes.update__form_container}
                spacing={2}
              >
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    label="Name"
                    variant="outlined"
                    className={classes.update__form_name}
                    color="secondary"
                    value={name}
                    fullWidth
                    onChange={(event) => setName(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="email"
                    label="Email"
                    variant="outlined"
                    className={classes.update__form_email}
                    color="secondary"
                    value={email}
                    fullWidth
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    label="Password"
                    variant="outlined"
                    className={classes.update__form_password}
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
                    className={classes.update__form_password}
                    color="secondary"
                    fullWidth
                    onChange={(event) => setConfirmPassword(event.target.value)}
                  />
                </Grid>
                <Grid container justify="center" alignItems="center">
                  <Grid item>
                    <Button
                      size="large"
                      className={classes.update__form_button}
                      variant="outlined"
                      type="submit"
                    >
                      Update
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteOpen}>
        <DialogTitle>Delete Profile</DialogTitle>
        <Divider />
        <DialogContent className={classes.update__form_container}>
          <Typography>Are you sure you want to delete your profile?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteOpen(false)} autoFocus>
            No
          </Button>
          <Button
            onClick={handleDelete}
            style={{ color: red[800], borderColor: red[800] }}
            variant="outlined"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;
