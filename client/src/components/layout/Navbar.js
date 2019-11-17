import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import GoogleOAuth from "../auth/GoogleOAuth";
import Logout from "../auth/Logout";

const Navbar = ({ currentUser, isLoggedIn }) => {
  return (
    <div>
      <ul>
        {isLoggedIn ? (
          <>
            <li>
              <Logout />
            </li>
            <li>
              <Link to="/dashboard">Home</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Log In</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <GoogleOAuth />
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
    isLoggedIn: state.auth.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Navbar)
);
