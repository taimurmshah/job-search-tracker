import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import Logout from "../auth/Logout";

const Navbar = ({ currentUser }) => {
  return (
    <div>
      {Object.keys(currentUser).length > 0 ? (
        <>
          <Logout />
          <p>Home Button</p>
        </>
      ) : (
        <>
          <Login />
          <Signup />
        </>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
