const express = require("express");
const Employee = require("../models/Employee");
const Template = require("../models/Template");
const Job = require("../models/Job");
const auth = require("../middleware/auth");
const nodemailer = require("nodemailer");
require("dotenv").config();
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const replaceValues = require("../helper-methods/email-helpers");

const router = new express.Router();

router.post("/gmail/send/new", auth, async (req, res) => {
  const user = req.user;
  const firstName = user.name.split(" ")[0];
  const lastName = user.name.split(" ")[1];
  const myEmail = user.google.email;
  const refreshToken = user.google.refresh_token;
  let accessToken = user.google.access_token;

  const employee = await Employee.findOne({ _id: req.body.employeeId });
  const job = await Job.findOne({ _id: employee.owner });

  const employeeEmail = employee.email;
  try {
    const smtpTransport = nodemailer.createTransport({
      service: "gmail",
      tls: {
        rejectUnauthorized: false
      },
      auth: {
        type: "OAuth2",
        user: myEmail,
        accessToken,
        refreshToken,
        clientId: process.env.OAUTH_CLIENT,
        clientSecret: process.env.OAUTH_SECRET
      }
    });

    let mailOptions = {
      from: myEmail,
      to: employeeEmail,
      subject: req.body.emailObj.subject,
      text: req.body.emailObj.message
    };

    if (req.body.emailObj.withResume) {
      mailOptions.attachments = [
        {
          filename: `${firstName}-${lastName}-Resume.pdf`,
          content: user.resume
        }
      ];
    }

    await smtpTransport.sendMail(mailOptions, async (err, result) => {
      if (err) {
        return smtpTransport.close();
      }

      const date = new Date();
      job.mostRecentEmailSent = date;
      job.status = "Waiting for email response";

      if (!Object.keys(employee).includes("response")) {
        employee.response = false;
      }

      employee.emailsSent = [
        ...employee.emailsSent,
        { method: "custom", time: date }
      ];

      if (job.numOfEmailsSent === 0) {
        job.progress = ["Applied"];
      }

      job.numOfEmailsSent++;

      await employee.save();
      await job.save();

      res.send({ result, employee });
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/gmail/send/template", auth, async (req, res) => {
  let template = await Template.findOne({ _id: req.body.templateId });
  const employee = await Employee.findOne({ _id: req.body.employeeId });
  const job = await Job.findOne({ _id: employee.owner });
  const user = req.user;
  const firstName = user.name.split(" ")[0];
  const lastName = user.name.split(" ")[1];
  const myEmail = user.google.email;
  const accessToken = user.google.access_token;
  const refreshToken = user.google.refresh_token;
  let emailsSent = employee.emailsSent;

  const employeeEmail = employee.email;
  try {
    const smtpTransport = nodemailer.createTransport({
      service: "gmail",
      tls: {
        rejectUnauthorized: false
      },
      auth: {
        type: "OAuth2",
        user: myEmail,
        accessToken,
        refreshToken,
        clientId: process.env.OAUTH_CLIENT,
        clientSecret: process.env.OAUTH_SECRET
      }
    });

    if (template.interpolationValues) {
      template = replaceValues(template, employee, job);
    }

    let mailOptions = {
      from: myEmail,
      to: employeeEmail,
      subject: template.subject,
      text: template.message
    };

    if (template.withResume) {
      mailOptions.attachments = [
        {
          filename: `${firstName}-${lastName}-Resume.pdf`,
          content: user.resume
        }
      ];
    }

    await smtpTransport.sendMail(mailOptions, async (err, result) => {
      if (err) {
        return smtpTransport.close();
      }

      if (!Object.keys(employee).includes("response")) {
        employee.response = false;
      }

      const date = new Date();

      if (
        employee.emailsSent.length > 0 &&
        employee.emailsSent[0].method === undefined
      ) {
        employee.emailsSent[0].method = "template";
        employee.emailsSent[0].template_id = "5de53ba3fcfed33a8fc61e21";
      }

      if (typeof employee.emailsSent !== "number") {
        employee.emailsSent = [
          ...employee.emailsSent,
          { method: "template", template_id: template._id, time: date }
        ];
      } else {
        employee.emailsSent = [
          { method: "template", template_id: "5de53ba3fcfed33a8fc61e21" },
          { method: "template", template_id: template._id, time: date }
        ];
      }
      job.mostRecentEmailSent = date;
      job.status = "Waiting for email response";

      if (job.numOfEmailsSent === 0) {
        job.progress = ["Applied"];
      }

      job.numOfEmailsSent++;
      await employee.save();
      await job.save();

      console.log(`email sent to ${employee.name + ": " + result.accepted[0]}`);
      res.send({ result, employee });
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
