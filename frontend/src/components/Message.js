import React from "react";
import { Alert } from "@material-ui/lab";

const Message = ({ severity, children }) => {
  return <Alert severity={severity}>{children}</Alert>;
};

export default Message;
