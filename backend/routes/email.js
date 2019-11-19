const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");
const nodeMailer = require("nodemailer");

const router = new express.Router();

//step 1 -- create transporter
let createTransporter = (email, password) => {
  return nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      password
    }
  });
};

let transporter = createTransporter("taimurmshah@gmail.com", "shnoremore101");

//step 2 - mail options:
let mailOptions = {
  from: "",
  to: "",
  subject: "",
  text: ""
};

//step 3 - use transporter to send
transporter.sendMail(mailOptions, (err, data) => {
  if (err) {
    console.log("error occurs");
  } else {
    console.log("email sent!");
  }
});
module.exports = router;
