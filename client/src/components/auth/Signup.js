import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import GoogleOAuth from "./GoogleOAuth";

const Signup = ({ isLoggedIn }) => {
  if (isLoggedIn) return <Redirect to="/dashboard" />;
  return (
    <div className="auth-buttons">
      <GoogleOAuth type="Register" />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  };
};

export default connect(mapStateToProps)(Signup);
