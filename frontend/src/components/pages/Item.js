import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import {
  Add,
  AddShoppingCart,
  ChevronLeft,
  FavoriteOutlined,
  Remove,
  Share,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { blue, green, orange, red } from "@material-ui/core/colors";
import { useDispatch, useSelector } from "react-redux";
import { listItemDetail } from "../../actions/itemActions";
import Loader from "../Loader";
import Message from "../Message";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    width: "80%",
    padding: 50,
  },
  item__container: {
    paddingTop: 20,
  },
  item__image: {
    maxWidth: "100%",
    border: "1px solid #e9e9e9",
  },
  item__info: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  item__brand: {
    marginLeft: 5,
  },
  item__description: {
    fontStyle: "italic",
  },
  item__highlight: {
    backgroundColor: "#ffffd6",
  },
  item__presale: {
    textDecoration: "line-through",
    color: "#ccc",
  },
  item__price: {
    fontWeight: 700,
  },
  item__stock: {
    fontWeight: 700,
  },
  item__limited: {
    color: orange[600],
    fontWeight: 700,
  },
  item__out: {
    color: "red",
    fontWeight: 700,
  },
  hidden: {
    display: "none",
  },
  item__actions: {
    padding: 20,
  },
  item__quantity_title: {
    fontWeight: "bold",
  },
  item__quantity_controls: {
    marginLeft: 10,
  },
  item__quantity: {
    maxWidth: 60,
    "& > div > input": {
      textAlign: "center",
    },
  },
  "@media only screen and (max-width: 900px)": {
    item__container: {
      flexDirection: "column",
    },
  },
}));

const Item = ({ match }) => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const itemDetail = useSelector((state) => state.itemDetail);
  const { isLoading, error, item } = itemDetail;
  const [quantity, setQuantity] = useState(1);

  const handleAddCart = () => {
    history.push(`/cart/${match.params.id}?qty=${quantity}`);
  };

  useEffect(() => {
    dispatch(listItemDetail(match.params.id));
  }, [match, dispatch]);

  return (
    <React.Fragment>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message severity="error">{error}</Message>
      ) : (
        <Box component="section" className={classes.root}>
          <Button
            onClick={() => {
              history.goBack();
            }}
            startIcon={<ChevronLeft />}
          >
            Go Back
          </Button>
          <Grid container spacing={3} className={classes.item__container}>
            <Grid item xs={6}>
              <img
                src={item.image}
                alt={item.name}
                className={classes.item__image}
              />
            </Grid>
            <Grid item xs={6} className={classes.item__info}>
              <Box>
                <Typography component="span">
                  <Typography variant="h2">{item.name}</Typography>
                  <Typography variant="h6" className={classes.item__brand}>
                    by {item.brand}
                  </Typography>
                </Typography>

                <Divider />
              </Box>
              <Typography
                variant="subtitle1"
                className={classes.item__description}
              >
                {item.description}
              </Typography>
              <Card className={classes.item__highlight} raised={true}>
                <CardContent>
                  <Typography variant="h6" className={classes.item__price}>
                    Price:{" "}
                    <span
                      className={
                        item.presalePrice === item.price
                          ? classes.hidden
                          : classes.item__presale
                      }
                    >
                      ${item.presalePrice}
                    </span>{" "}
                    ${item.price}
                  </Typography>
                  <Typography
                    component="h6"
                    className={
                      item.countInStock === 0
                        ? classes.item__out
                        : item.countInStock < 20
                        ? classes.item__limited
                        : classes.item__stock
                    }
                  >
                    {item.countInStock === 0
                      ? "Out of Stock"
                      : item.countInStock < 20
                      ? "In Stock: " + item.countInStock + " (Few Stocks Left)"
                      : "In Stock: " + item.countInStock}
                  </Typography>
                </CardContent>
                <Divider />
                <CardActions className={classes.item__actions}>
                  <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                    spacing={1}
                  >
                    <Grid container>
                      <Grid item>
                        <Typography
                          component="h6"
                          className={classes.item__quantity_title}
                        >
                          Quantity:
                        </Typography>
                      </Grid>
                      <Grid item className={classes.item__quantity_controls}>
                        <IconButton
                          color="secondary"
                          size="small"
                          onClick={() => setQuantity(quantity - 1)}
                          disabled={quantity === 1}
                        >
                          <Remove />
                        </IconButton>
                        <TextField
                          className={classes.item__quantity}
                          value={quantity}
                          variant="outlined"
                          size="small"
                          color="secondary"
                        />
                        <IconButton
                          color="secondary"
                          size="small"
                          onClick={() => setQuantity(quantity + 1)}
                          disabled={quantity === item.countInStock}
                        >
                          <Add />
                        </IconButton>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item>
                        <Button
                          style={{ color: green[600] }}
                          startIcon={<AddShoppingCart />}
                          disabled={item.countInStock === 0}
                          onClick={handleAddCart}
                        >
                          Add to Cart
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          style={{ color: red[400] }}
                          startIcon={<FavoriteOutlined />}
                        >
                          Add to Wishlist
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          style={{ color: blue[400] }}
                          startIcon={<Share />}
                        >
                          Share
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardActions>
              </Card>

              <Box>
                <Divider />
                <Grid container spacing={1}>
                  {item.numReviews > 0 ? (
                    <React.Fragment>
                      <Grid item>
                        <Typography variant="subtitle2">
                          Rating: {item.rating}
                          <Rating
                            precision={0.5}
                            value={item.rating}
                            size="small"
                            readOnly
                          />
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle2">
                          ({item.numReviews} reviews)
                        </Typography>
                      </Grid>
                    </React.Fragment>
                  ) : (
                    <Typography variant="subtitle2">No Ratings yet</Typography>
                  )}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </React.Fragment>
  );
};

export default Item;
