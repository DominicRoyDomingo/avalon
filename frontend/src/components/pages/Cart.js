import {
  Box,
  Typography,
  makeStyles,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Divider,
  IconButton,
  TextField,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../actions/cartActions";
import Message from "../Message";
import {
  Add,
  AttachMoney,
  ChevronLeft,
  Delete,
  Remove,
} from "@material-ui/icons";
import { green, red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    width: "80%",
    padding: 50,
  },
  cart__root: {
    margin: "50px 0",
  },
  cart__container: {
    display: "flex",
    width: "100%",
  },
  cart__image: {
    width: "25%",
  },
  cart__info: {
    width: "35%",
  },
  cart__quantity_title: {
    fontWeight: "bold",
  },
  cart__quantity: {
    maxWidth: 60,
    "& > div > input": {
      textAlign: "center",
    },
  },
  cart__subtotal: {
    textAlign: "right",
    marginTop: 20,
  },
  cart__subtotal_container: {
    float: "right",
  },
  cart__quantity_controls: {
    marginLeft: 10,
  },
  cart__checkout_button: {
    color: green[200],
    backgroundColor: green[900],
    float: "right",
    marginTop: 20,
    "&:hover": {
      backgroundColor: green[700],
    },
  },
}));

const Cart = ({ match, location }) => {
  const history = useHistory();
  const classes = useStyles();
  const itemId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (itemId) {
      dispatch(addToCart(itemId, qty));
    }
  }, [dispatch, itemId, qty]);

  return (
    <React.Fragment>
      <Box component="section" className={classes.root}>
        <Button
          onClick={() => {
            history.goBack();
          }}
          startIcon={<ChevronLeft />}
        >
          Go Back
        </Button>
        <Typography variant="h4">Cart</Typography>
        {cartItems.length === 0 ? (
          <Message>Hurray! You've cleared out your cart!</Message>
        ) : (
          <Grid container className={classes.cart__root} spacing={4}>
            {cartItems.map((item) => (
              <Grid item xs={12} key={item.id}>
                <Card className={classes.cart__container} elevation={6}>
                  <CardMedia
                    className={classes.cart__image}
                    image={item.image}
                  />
                  <CardContent className={classes.cart__info}>
                    <Link to={`/item/${item.id}`}>
                      <Typography variant="h4">{item.name}</Typography>
                    </Link>
                    <Typography gutterBottom component="h6">
                      by {item.brand}
                    </Typography>
                    <Typography variant="h5">${item.price}</Typography>
                  </CardContent>
                  <CardActions>
                    <Divider orientation="vertical" />
                    <Grid container spacing={1}>
                      <Grid item>
                        <Typography
                          component="h6"
                          className={classes.cart__quantity_title}
                          gutterBottom
                        >
                          Quantity:
                        </Typography>
                      </Grid>
                      <Grid item className={classes.cart__quantity_controls}>
                        <IconButton
                          color="secondary"
                          size="small"
                          onClick={() =>
                            dispatch(addToCart(item.id, --item.qty))
                          }
                          disabled={item.qty === 1}
                        >
                          <Remove />
                        </IconButton>
                        <TextField
                          className={classes.cart__quantity}
                          value={item.qty}
                          variant="outlined"
                          size="small"
                          color="secondary"
                        />
                        <IconButton
                          color="secondary"
                          size="small"
                          onClick={() =>
                            dispatch(addToCart(item.id, ++item.qty))
                          }
                          disabled={item.qty === item.countInStock}
                        >
                          <Add />
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <Divider orientation="vertical" />
                      </Grid>
                      <Grid item>
                        <Button
                          style={{ color: red[900] }}
                          startIcon={<Delete />}
                          onClick={() => {
                            dispatch(removeFromCart(item.id));
                          }}
                        >
                          Remove from Cart
                        </Button>
                      </Grid>
                    </Grid>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
        <Divider />
        <Grid container className={classes.cart__subtotal_container}>
          <Grid item xs>
            <Box className={classes.cart__subtotal}>
              <Typography variant="h5">
                Total: $
                {cartItems
                  .reduce((accu, item) => accu + item.price * item.qty, 0)
                  .toFixed(2)}{" "}
              </Typography>
              <Typography variant="h6">
                Qty: {cartItems.reduce((accu, item) => accu + item.qty, 0)}{" "}
                item(s)
              </Typography>
            </Box>
            <Button
              className={classes.cart__checkout_button}
              startIcon={<AttachMoney />}
              variant="contained"
              disabled={
                cartItems.reduce((accu, item) => accu + item.qty, 0) === 0
              }
            >
              Checkout
            </Button>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default Cart;
