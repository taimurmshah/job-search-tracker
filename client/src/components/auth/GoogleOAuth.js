import React from "react";
import { connect } from "react-redux";
import GoogleLogin from "react-google-login";
import { googleOAuthThunk } from "../../redux/thunks/auth";

//todo take care of the clientId value -- why isn't process.env working?

const GoogleOAuth = props => {
  const googleResponse = response => {
    const code = response.code;
    console.log({ response });
    props.googleOAuthThunk(code);
  };

  const scope =
    "https://mail.google.com/ openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email";

  return (
    <GoogleLogin
      accessType="offline"
      scope={scope}
      responseType="code"
      redirectUri="postmessage"
      onSuccess={googleResponse}
      onFailure={err => {
        console.log({ err });
      }}
      clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
      render={renderProps => (
        <button
          className="login-page-button google-button"
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          {props.type + " with Google"}
        </button>
      )}
    />
  );
};

const mapDispatchToProps = dispatch => {
  return {
    googleOAuthThunk: code => dispatch(googleOAuthThunk(code))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(GoogleOAuth);
