const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
require("dotenv").config();

// const id =
//   "602278501830-b6dgn7vhmg5ui2ccefo5q91rllluhv70.apps.googleusercontent.com";
// const secret = "G__CY5nGsckdEK79X10KQgad";
// const refreshToken =
//   "1//04i05kCRrvneCCgYIARAAGAQSNwF-L9IrV6G8qI81Mw43qQFUz6fbaEXGJvS45Ix7lpVpXFW4nzqWNuwNq8vkJbKFH9bdETunKrY";
const redirectURI = "https://developers.google.com/oauthplayground";

// const oauth2Client = new OAuth2(id, secret, redirectURI);
const oauth2Client = new OAuth2(
  process.env.OAUTH_CLIENT,
  process.env.OAUTH_SECRET,
  redirectURI
);

const scopes = ["https://mail.google.com/"];

const url = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: scopes,
  prompt: "consent"
});

oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN
});

const accessToken = oauth2Client.getAccessToken();

const smtpTransport = nodemailer.createTransport({
  service: "gmail",
  tls: {
    rejectUnauthorized: false
  },
  auth: {
    type: "OAuth2",
    user: "taimurmshah@gmail.com",
    clientId: process.env.OAUTH_CLIENT,
    clientSecret: process.env.OAUTH_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    accessToken
  }
});

const mailOptions = {
  from: "taimurmshah@gmail.com",
  to: "tshah1395@gmail.com",
  subject: "Test",
  text: "yer"
};

smtpTransport.sendMail(mailOptions, (err, res) => {
  err ? console.log({ err }) : console.log({ res });
  smtpTransport.close();
});
