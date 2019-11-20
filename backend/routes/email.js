const express = require("express");
const User = require("../models/User");
const Employee = require("../models/Employee");
const auth = require("../middleware/auth");
const nodemailer = require("nodemailer");
require("dotenv").config();
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const router = new express.Router();

router.post("/gmail/send", auth, async (req, res) => {
  const myEmail = req.user.google.email;

  const employee = await Employee.findOne({ _id: req.body.employeeId });

  const employeeEmail = employee.email;
  try {
    const oauth2Client = new OAuth2(
      process.env.OAUTH_CLIENT,
      process.env.OAUTH_SECRET,
      process.env.REDIRECT_URI
    );

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
        user: myEmail,
        clientId: process.env.OAUTH_CLIENT,
        clientSecret: process.env.OAUTH_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken
      }
    });

    const mailOptions = {
      from: "taimurmshah@gmail.com",
      to: employeeEmail,
      subject: req.body.emailObj.subject,
      text: req.body.emailObj.message
    };

    await smtpTransport.sendMail(mailOptions, async (err, result) => {
      if (err) {
        console.log({ err });
        smtpTransport.close();
        // throw new Error(err);
      }

      console.log({ result });

      employee.response = false;
      await employee.save();

      res.send({ result });
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
