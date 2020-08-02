const express = require("express");
const auth = require("../middleware/auth");
const Job = require("../models/Job");
const Employee = require("../models/Employee");

const router = new express.Router();

//this was after an update to the schema.
router.patch("/jobs/model-update", auth, async (req, res) => {
  try {
    const user = req.user;
    await user
      .populate({
        path: "jobs"
      })
      .execPopulate();

    let jobs = user.jobs;

    for (let i = 0; i < jobs.length; i++) {
      const job = jobs[i];
      let numOfEmailsSent = 0;
      await job
        .populate({
          path: "employees"
        })
        .execPopulate();

      const employees = job.employees;
      for (let j = 0; j < employees.length; j++) {
        const employee = employees[j];
        numOfEmailsSent += employee.emailsSent.length;
      }

      job.numOfEmailsSent = numOfEmailsSent;
      console.log("current Job:", job.company, "emails Sent:", numOfEmailsSent);
      await job.save();
    }

    res.send("success");
  } catch (err) {
    // console.log("In the error, here's the error:", err);
    res.status(500).send(err);
  }
});

//create new job
router.post("/jobs", auth, async (req, res) => {
  if (req.body.website[0] === "h") {
    req.body.website = req.body.website.split("/")[2];
  }

  const job = new Job({
    ...req.body,
    owner: req.user._id
  });

  try {
    await job.save();

    res.send(job);
  } catch (err) {
    res.status(400).send(err);
  }
});

//view all of my jobs
router.get("/jobs", auth, async (req, res) => {
  try {
    const user = req.user;
    await user
      .populate({
        path: "jobs"
      })
      .execPopulate();

    let jobs = user.jobs;

    for (let i = 0, j = jobs.length - 1; i < j; i++, j--) {
      [jobs[i], jobs[j]] = [jobs[j], jobs[i]];
    }

    res.send(jobs);
  } catch (err) {
    res.status(500).send(err);
  }
});

//get job by id
router.get("/jobs/:id", auth, async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, owner: req.user._id });
    if (!job) {
      return res.status(400).send();
    }

    res.send(job);
  } catch (err) {
    res.status(500).send(err);
  }
});

//update job
router.patch("/jobs/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  // console.log("updates:", updates);

  if (req.body.website && req.body.website[0] === "h") {
    req.body.website = req.body.website.split("/")[2];
  }

  const allowedUpdates = [
    "response",
    "status",
    "notes",
    "progress",
    "link",
    "company",
    "linkedIn",
    "website"
  ];

  for (let i = 0; i < updates.length; i++) {
    if (!allowedUpdates.includes(updates[i])) {
      return res.status(400).send({ error: "Invalid update parameters." });
    }
  }

  try {
    let _id = req.params.id;

    const job = await Job.findOne({ _id, owner: req.user._id });

    if (!job) return res.status(404).send();

    updates.forEach(update => (job[update] = req.body[update]));

    await job.save();

    res.send(job);
  } catch (err) {
    res.status(400).send(err);
  }
});

//delete job
router.delete("/jobs/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const job = await Job.findOneAndDelete({ _id, owner: req.user._id });

    if (!job) return res.status(400).send();

    res.send(job);
  } catch (err) {
    res.status(500).send(err);
  }
});

//job progress stats for d3
router.get("/jobs/d3/progress", auth, async (req, res) => {
  let d3Info = {
    Applied: 0,
    "Recruiter Call": 0,
    "Technical Call": 0,
    "Code Challenge": 0,
    Onsite: 0,
    Offer: 0
  };

  try {
    const user = req.user;
    await user
      .populate({
        path: "jobs"
      })
      .execPopulate();

    let jobs = user.jobs;

    for (let i = 0; i < jobs.length; i++) {
      let prog = jobs[i].progress;

      if (
        jobs[i].company === "Friends" ||
        jobs[i].company === "Example (Github)"
      )
        continue;
      for (let j = 0; j < prog.length; j++) {
        d3Info[prog[j]]++;
      }
    }

    d3Info = [
      { stage: "Applied", number: d3Info.Applied },
      // { stage: "Applied", number: 100 },
      { stage: "Recruiter Call", number: d3Info["Recruiter Call"] },
      { stage: "Code Challenge", number: d3Info["Code Challenge"] },
      { stage: "Technical Call", number: d3Info["Technical Call"] },
      { stage: "Onsite", number: d3Info.Onsite },
      { stage: "Offer", number: d3Info.Offer }
    ];

    res.send(d3Info);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
