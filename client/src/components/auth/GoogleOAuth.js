import React from "react";
import { connect } from "react-redux";
import GoogleLogin from "react-google-login";
import { googleOAuthThunk } from "../../redux/thunks/auth";

//todo take care of the clientId value -- why isn't process.env working?

const GoogleOAuth = props => {
  const googleResponse = response => {
    console.log({ response });
    // console.log("access_token:", response.Zi.access_token);
    // props.googleOAuthThunk(response.Zi.access_token);
  };

  console.log("oauth:", process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID);

  return (
    <GoogleLogin
      responseType="code"
      onSuccess={googleResponse}
      onFailure={googleResponse}
      clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
      buttonText={props.type}
    />
  );
};

const mapDispatchToProps = dispatch => {
  return {
    googleOAuthThunk: access_token => dispatch(googleOAuthThunk(access_token))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(GoogleOAuth);

//"602278501830-rphr8gpcgsbitjkn43gcej296j9723sh.apps.googleusercontent.com"
