require("dotenv").config();
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const fetch = require("node-fetch");

const accessTokenRemainingTime = async accessToken => {
  try {
    let res = await fetch(
      `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`,
      {
        method: "GET"
      }
    );
    res = await res.json();

    return res;
  } catch (err) {
    console.log({ err });
  }
};

const getTokens = async code => {
  const oauth2Client = new OAuth2(
    process.env.OAUTH_CLIENT,
    process.env.OAUTH_SECRET,
    process.env.REDIRECT_URI
    // "postmessage"
  );

  const { tokens } = await oauth2Client.getToken(code);
  return tokens;
};

const fetchUserProfile = async access_token => {
  try {
    let res = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });

    res = await res.json();
    return res;
  } catch (err) {
    console.log({ err });
  }
};

module.exports = { accessTokenRemainingTime, getTokens, fetchUserProfile };
