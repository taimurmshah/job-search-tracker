import React from "react";
import { connect } from "react-redux";
import { logoutThunk } from "../../redux/thunks/auth";
import { GoogleLogout } from "react-google-login";

const Logout = ({ logoutThunk, method }) => {
  const token = localStorage.getItem("token");

  // if (method === "google") {
  //   return (
  //     <GoogleLogout
  //       render={renderProps => (
  //         <a
  //           href="#"
  //           onClick={renderProps.onClick}
  //           // disabled={renderProps.disabled}
  //         >
  //           Log Out
  //         </a>
  //       )}
  //       clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
  //       buttonText="logout"
  //       onLogoutSuccess={() => logoutThunk(token)}
  //     />
  //   );
  // }

  return (
    <button
      className="nav-link"
      onClick={e => {
        e.preventDefault();
        return logoutThunk(token);
      }}
    >
      Log Out
    </button>
  );
};

const mapStateToProps = state => {
  return {
    method: state.auth.currentUser.method
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logoutThunk: token => dispatch(logoutThunk(token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);
