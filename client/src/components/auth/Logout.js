import React from "react";
import { connect } from "react-redux";
import { logoutThunk } from "../../redux/thunks/auth";

const Logout = ({ logoutThunk }) => (
  <button
    onClick={e => {
      e.preventDefault();
      const token = localStorage.getItem("token");
      return logoutThunk(token);
    }}
  >
    Log Out
  </button>
);

const mapDispatchToProps = dispatch => {
  return {
    logoutThunk: token => dispatch(logoutThunk(token))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Logout);
