import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Face, LocalMall } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles(() => ({
  header__container: {
    justifyContent: "space-between",
  },
  header__button: {
    borderRadius: 0,
    margin: "0 10px",
    fontWeight: 700,
  },
  header__button_icon: {
    fontSize: 20,
  },
}));

const Header = () => {
  const classes = useStyles();
  const [menu, setMenu] = React.useState(null);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleClick = (event) => {
    setMenu(event.currentTarget);
  };

  const handleClose = () => {
    setMenu(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Box component="header" className={classes.header}>
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar className={classes.header__container}>
          <Link to="/">
            <Typography variant="h1" className={classes.header__title}>
              AVALON
            </Typography>
          </Link>
          <Box className={classes.header__buttons}>
            <IconButton className={classes.header__button_icon}>
              <Badge
                badgeContent={cartItems.length}
                className={classes.header__button_badge}
                style={{ color: red[900] }}
              >
                <Link to="/cart">
                  <LocalMall color="secondary" />
                </Link>
              </Badge>
            </IconButton>
            <Button
              aria-controls="account__menu"
              aria-haspopup="true"
              onClick={handleClick}
              startIcon={<Face />}
              variant="outlined"
              className={classes.header__button}
            >
              {!!!userInfo ? "Account" : userInfo.name}
            </Button>
            <Menu
              id="account__menu"
              anchorEl={menu}
              open={Boolean(menu)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                {!!!userInfo ? (
                  <Link to="/login">Login</Link>
                ) : (
                  <Link to="/profile">View Profile</Link>
                )}
              </MenuItem>
              <MenuItem onClick={handleClose}>
                {!!!userInfo ? (
                  <Link to="/registration">Sign up</Link>
                ) : (
                  <Link to="#" onClick={handleLogout}>
                    Logout
                  </Link>
                )}
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
