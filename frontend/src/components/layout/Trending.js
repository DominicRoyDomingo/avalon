import {
  Box,
  GridList,
  GridListTile,
  GridListTileBar,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Star } from "@material-ui/icons";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listItems } from "../../actions/itemActions";
import Message from "../Message";
import Loader from "../Loader";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    width: "80%",
    padding: 50,
  },
  trending__container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    overflow: "hidden",
  },
  trending__item: {
    margin: "30px auto",
    maxWidth: 400,
    minWidth: 300,
  },
  trending__brand: {
    fontWeight: 400,
    color: "#e0e0e0",
  },
  trending__more: {
    marginTop: 10,
  },
  trending__info: {
    height: "100%",
    transition: "all 1s ease-in-out",
    cursor: "pointer",
  },
  trending__price: {
    marginTop: 50,
    fontWeight: 900,
  },
  rating__container: {
    marginTop: 30,
    color: "#ffdd08",
    bottom: 0,
    "& > *": {
      marginTop: 5,
    },
  },
  rating__icon: {
    fontSize: 15,
  },
}));

const Trending = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const itemList = useSelector((state) => state.itemList);
  const { isLoading, error, items } = itemList;

  useEffect(() => {
    dispatch(listItems());
  }, [dispatch]);

  return (
    <React.Fragment>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message severity="error">{error}</Message>
      ) : (
        <Box component="section" className={classes.root}>
          <Typography variant="h4">Top Picks</Typography>
          <GridList cellHeight={250} className={classes.trending__container}>
            {items.map((item) => (
              <GridListTile key={item._id} className={classes.trending__item}>
                <img src={item.image} alt={item.name} />
                <GridListTileBar
                  className={classes.trending__info}
                  title={
                    <h1 className={classes.trending__name}>{item.name}</h1>
                  }
                  subtitle={
                    <Link to={`/item/` + item._id}>
                      <div className={classes.trending__more}>
                        <h3 className={classes.trending__brand}>
                          by {item.brand}
                        </h3>
                        <h2 className={classes.trending__price}>
                          $ {item.price}
                        </h2>

                        <div className={classes.rating__container}>
                          <h3>
                            Rated {item.rating}
                            <Star className={classes.rating__icon} />
                          </h3>
                          <h3>({item.numReviews} Reviews)</h3>
                        </div>
                      </div>
                    </Link>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        </Box>
      )}
    </React.Fragment>
  );
};

export default Trending;
