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

const registerUser = async (userProfile, refresh_token) => {
  try {
    let user = new User({
      name: userProfile.name,
      method: "google",
      "google.id": userProfile.sub,
      "google.email": userProfile.email,
      "google.refresh_token": refresh_token,
      imageUrl: userProfile.picture
    });
    await user.save();

    return user;
  } catch (err) {
    console.log({ err });
  }
};

const googleOAuth = async (req, res, next) => {
  try {
    const code = req.body.code;

    const tokens = await getTokens(code);

    const access_token = tokens.access_token;
    let refresh_token;
    if (tokens.refresh_token) {
      refresh_token = tokens.refresh_token;
    }
    const userProfile = await fetchUserProfile(access_token);

    const googleId = userProfile.sub;

    //check for existing User
    const existingUser = await User.findOne({
      method: "google",
      "google.id": googleId
    });

    if (!existingUser) {
      const user = await registerUser(userProfile, refresh_token);
      req.user = user;

      return next();
    }

    if (refresh_token) {
      existingUser.refresh_token = refresh_token;
      await user.save();
    }

    req.user = existingUser;
    next();
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = googleOAuth;
