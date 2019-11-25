const express = require("express");
const Employee = require("../models/Employee");
const auth = require("../middleware/auth");
const nodemailer = require("nodemailer");
require("dotenv").config();
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const {
  accessTokenRemainingTime
} = require("../helper-methods/google-oauth-helpers");

const router = new express.Router();

router.post("/gmail/send", auth, async (req, res) => {
  const user = req.user;
  const firstName = user.name.split(" ")[0];
  const lastName = user.name.split(" ")[1];
  const myEmail = user.google.email;
  const refresh_token = user.google.refresh_token;
  const resume = user.resume;
  let access_token = user.google.access_token;

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

    const tokenInfo = await accessTokenRemainingTime(access_token);

    // console.log({ tokenInfo });

    //i dont really need to get a new token.
    if (tokenInfo.error) {
      console.log("I need a new access token!");
      access_token = await oauth2Client.getAccessToken();
      console.log({ access_token });
      user.google.access_token = access_token.token;
      await user.save();
    }

    // console.log({ access_token, refresh_token });

    const smtpTransport = nodemailer.createTransport({
      service: "gmail",
      tls: {
        rejectUnauthorized: false
      },
      auth: {
        type: "OAuth2",
        // user: myEmail,
        clientId: process.env.OAUTH_CLIENT,
        clientSecret: process.env.OAUTH_SECRET
        // refreshToken: refresh_token,
        // accessToken: access_token
      }
    });

    const mailOptions = {
      from: myEmail,
      to: employeeEmail,
      subject: req.body.emailObj.subject,
      text: req.body.emailObj.message,
      auth: {
        user: myEmail,
        refreshToken: refresh_token,
        // accessToken: access_token,
        expires: Date.now()
      },
      attachments: [
        {
          filename: `${firstName}-${lastName}-Resume.pdf`,
          content: resume
        }
      ]
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
