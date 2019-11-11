import React from "react";
import { connect } from "react-redux";
import { logoutThunk } from "../../redux/thunks/auth";

const Logout = ({ logoutThunk }) => (
  <button
    onClick={e => {
      e.preventDefault();
      return logoutThunk();
    }}
  >
    Log Out
  </button>
);

const mapDispatchToProps = dispatch => {
  return {
    logoutThunk: () => dispatch(logoutThunk())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Logout);
