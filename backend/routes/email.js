const express = require("express");
const User = require("../models/User");
const Employee = require("../models/Employee");
const auth = require("../middleware/auth");
const nodemailer = require("nodemailer");
require("dotenv").config();
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const fetch = require("node-fetch");
const {
  accessTokenRemainingTime
} = require("../helper-methods/google-oauth-helpers");

const router = new express.Router();

router.post("/gmail/send", auth, async (req, res) => {
  const user = req.user;

  const myEmail = user.google.email;
  const refresh_token = user.google.refresh_token;
  // let access_token = user.google.access_token;

  const employee = await Employee.findOne({ _id: req.body.employeeId });

  const employeeEmail = employee.email;
  try {
    const oauth2Client = new OAuth2(
      process.env.OAUTH_CLIENT,
      process.env.OAUTH_SECRET,
      process.env.REDIRECT_URI
    );

    oauth2Client.setCredentials({
      refresh_token: refresh_token
    });

    // let testResponse = await oauth2Client.getRequestHeaders();

    // let access_token = testResponse.Authorization.split(" ")[1];

    const access_token = await oauth2Client.getAccessToken();
    console.log({ access_token });

    const tokenInfo = await accessTokenRemainingTime(access_token);

    // console.log({ tokenInfo });

    // if (tokenInfo.expires_in <= 0) {
    //   console.log("I need a new access token!");
    //
    //   let testResponse = await oauth2Client.getRequestHeaders();
    //
    //   access_token = testResponse.Authorization.split(" ")[1];
    //
    //   user.google.access_token = access_token;
    //   await user.save();
    // }

    console.log("right before it");

    console.log({ access_token, refresh_token });

    const smtpTransport = nodemailer.createTransport({
      service: "gmail",
      tls: {
        rejectUnauthorized: false
      },
      auth: {
        type: "OAuth2",
        user: myEmail,
        clientId: process.env.OAUTH_CLIENT,
        clientSecret: process.env.OAUTH_SECRET,
        refreshToken: refresh_token,
        accessToken: access_token
      }
    });

    const mailOptions = {
      from: myEmail,
      to: employeeEmail,
      subject: req.body.emailObj.subject,
      text: req.body.emailObj.message
    };

    await smtpTransport.sendMail(mailOptions, async (err, result) => {
      if (err) {
        console.log("in sendmail err", { err });
        return smtpTransport.close();
      }

      console.log({ result });

      employee.response = false;
      await employee.save();

      res.send({ result });
    });
  } catch (err) {
    console.log("in the overall catch, here's the error", err);
    res.status(400).send(err);
  }
});

module.exports = router;
