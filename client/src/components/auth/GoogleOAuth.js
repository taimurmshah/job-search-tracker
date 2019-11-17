import React from "react";
import GoogleLogin from "react-google-login";

//todo take care of the clientId value -- why isn't process.env working?

const GoogleOAuth = props => {
  const googleResponse = response => {
    console.log({ response });
  };
  return (
    <GoogleLogin
      onSuccess={googleResponse}
      onFailure={err => {
        console.log({ err });
      }}
      clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT}
    />
  );
};

export default GoogleOAuth;
