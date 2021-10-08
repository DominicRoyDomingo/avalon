import React from "react";
import { Box, Grid, makeStyles } from "@material-ui/core";
import Message from "./Message";
import Loader from "./Loader";

const useStyles = makeStyles(() => ({
  form__container: {
    background: "rgba(255,255,255, 0.85)",
    width: "25%",
    padding: 50,
    borderRadius: 5,
    margin: "auto",
  },
  form__error: { marginBottom: 10 },
}));

const Form = ({ isLoading, error, children }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      {isLoading ? (
        <Loader color="primary" />
      ) : (
        <>
          <Box className={classes.form__container}>
            {error && (
              <Grid className={classes.form__error}>
                <Message severity="error">{error}</Message>
              </Grid>
            )}
            {children}
          </Box>
        </>
      )}
    </React.Fragment>
  );
};

export default Form;
