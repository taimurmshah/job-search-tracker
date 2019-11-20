const User = require("../models/User");
require("dotenv").config();
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const fetch = require("node-fetch");

const getTokens = async code => {
  const oauth2Client = new OAuth2(
    process.env.OAUTH_CLIENT,
    process.env.OAUTH_SECRET,
    process.env.REDIRECT_URI
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

const googleOAuth = async (req, res, next) => {
  try {
    const code = req.body.code;

    console.log({ code });

    const tokens = await getTokens(code);

    console.log({ tokens });

    const access_token = tokens.access_token;

    let refresh_token;
    if (tokens.refresh_token) {
      refresh_token = tokens.refresh_token;
    }

    const userProfile = await fetchUserProfile(access_token);

    console.log({ userProfile });

    // const existingUser = await User.findOne({
    //   method: "google",
    //   "google.id": googleId
    // });

    // if (existingUser) {
    //   req.user = existingUser;
    //   return next();
    // }

    // const newUser = await new User({
    //   name,
    //   method: "google",
    //   "google.id": googleId,
    //   "google.email": email,
    //   imageUrl: imageUrl
    // });
    //
    // await newUser.save();
    //
    // req.user = newUser;
    // next();
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = googleOAuth;
