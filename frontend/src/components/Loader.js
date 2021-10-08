import React from "react";
import { Box, LinearProgress, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  loading: {
    width: "25%",
    margin: "1% auto",
    padding: 100,
  },
  loading__bar: {
    margin: "auto",
  },
  loading__text: {
    textAlign: "center",
    padding: 10,
    fontWeight: "bold",
  },
}));

const Loader = ({ color = "secondary" }) => {
  const classes = useStyles();

  return (
    <Box className={classes.loading}>
      <LinearProgress color="secondary" className={classes.loading__bar} />
      <Typography className={classes.loading__text} color={color}>
        Loading
      </Typography>
    </Box>
  );
};

export default Loader;
