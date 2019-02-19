import React from "react";
import { connect } from "react-redux";
import { Alert } from "reactstrap";

const ErrorMsgComponent = ({ message }) => {
  if (message) {
    return <Alert color="danger">{message}</Alert>;
  }
  return <></>;
};

const mapStateToProps = ({ error }) => {
  return {
    message: error.message
  };
};

const ErrorMsg = connect(mapStateToProps)(ErrorMsgComponent);
export { ErrorMsg };
