const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/User");
const Company = require("../models/Company");
const Job = require("../models/Job");
const Job2 = require("../models/Job2");
const Employee = require("../models/Employee");
const Employee2 = require("../models/Employee2");

const router = new express.Router();

//create new company instances;
router.patch("/model-updates/new-companies", auth, async (req, res) => {
  try {
    const user = req.user;
    //i want to get all the old jobs, and create companies out of these.
    await user.populate({ path: "jobs" }).execPopulate();
    let jobs = user.jobs;
    //go through jobs and use the info to create new company and new employees.
    for (let i = 0; i < jobs.length; i++) {
      let oldJob = jobs[i];
      let {
        company,
        website,
        link,
        linkedIn,
        response,
        mostRecentEmailSent,
        numOfEmailsSent,
        notes,
        progress,
        owner
      } = oldJob;
      await oldJob.populate({ path: "employees" }).execPopulate();
    }
  } catch (err) {}
});

module.exports = router;
