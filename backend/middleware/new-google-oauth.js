const User = require("../models/User");
require("dotenv").config();
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const googleOAuth = async (req, res, next) => {
  console.log("route is hit");
  try {
    console.log("in the try");

    const oauth2Client = new OAuth2(
      process.env.OAUTH_CLIENT,
      process.env.OAUTH_SECRET,
      process.env.REDIRECT_URI
    );

    const code = req.body.code;

    const scope = [
      "https://mail.google.com/",
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ];

    // const url = oauth2Client.generateAuthUrl({
    //   access_type: "offline",
    //   scope
    // });

    console.log({ code });

    // const headers = await oauth2Client.getRequestHeaders(url);
    //
    // console.log({ headers });
    // console.log("methods:", oauth2Client)

    console.log({ url });

    const res = await oauth2Client.getToken(code);

    console.log({ res });

    let refresh_token;
    oauth2Client.on("tokens", tokens => {
      if (tokens.refresh_token) {
        // store the refresh_token in my database!
        refresh_token = tokens.refresh_token;
        console.log(tokens.refresh_token);
      }
      console.log(tokens.access_token);
    });

    oauth2Client.setCredentials(tokens);

    next();
  } catch (err) {
    console.log({ err });
  }
};

module.exports = googleOAuth;
