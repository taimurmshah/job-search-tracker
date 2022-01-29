const User = require("../models/User");
require("dotenv").config();
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const fetch = require("node-fetch");
const {
  getTokens,
  fetchUserProfile,
} = require("../helper-methods/google-oauth-helpers");

const registerUser = async (userProfile, refresh_token, access_token) => {
  try {
    let user = new User({
      name: userProfile.name,
      method: "google",
      "google.id": userProfile.sub,
      "google.email": userProfile.email,
      "google.refresh_token": refresh_token,
      "google.access_token": access_token,
      imageUrl: userProfile.picture,
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

    const userProfile = await fetchUserProfile(access_token);

    const googleId = userProfile.sub;

    //check for existing User
    const existingUser = await User.findOne({
      method: "google",
      "google.id": googleId,
    });

    if (tokens.refresh_token) refresh_token = tokens.refresh_token;

    //create new user
    if (!existingUser) {
      const user = await registerUser(userProfile, refresh_token, access_token);

      await user.save();
      req.user = user;

      return next();
    }

    existingUser.google.access_token = access_token;

    if (refresh_token) {
      existingUser.google.refresh_token = refresh_token;
    }

    await existingUser.save();

    req.user = existingUser;
    next();
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = googleOAuth;
