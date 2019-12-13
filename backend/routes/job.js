const express = require("express");
const auth = require("../middleware/auth");
const Job = require("../models/Job");
const Employee = require("../models/Employee");

const router = new express.Router();

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
      let mostRecentDate = null;
      let response = false;
      const job = jobs[i];
      console.log("current Job:", job.company);
      await job
        .populate({
          path: "employees"
        })
        .execPopulate();

      let employees = job.employees;

      for (let j = 0; j < employees.length; j++) {
        const e = employees[j];
        console.log("current Employee:", e.name);
        if (e.emailsSent.length === 0) {
          job.status = "Haven't sent email yet";
        } else if (e.emailsSent.length > 0) {
          // console.log(`${e.name}'s emailsSent:`, e.emailsSent);

          job.status = "Waiting for response";
          if (e.response) response = true;

          let emails = e.emailsSent;

          for (let k = 0; k < emails.length; k++) {
            if (!e.emailsSent[k].method) {
              e.emailsSent[k].method = "template";
              e.emailsSent[k].template_id = "5de53ba3fcfed33a8fc61e21";
            }

            if (typeof e.emailsSent[k] === "number") {
              e.emailsSent[k] = {
                method: "template",
                template_id: "5de53ba3fcfed33a8fc61e21",
                time: new Date()
              };
            }
            let newTime = new Date(e.emailsSent[k].time);
            e.emailsSent[k].time = newTime;
          }

          let last = emails.length - 1;

          if (mostRecentDate === null) {
            mostRecentDate = e.emailsSent[last].time;
          } else {
            e.emailsSent[last].time > mostRecentDate &&
              (mostRecentDate = e.emailsSent[last].time);
          }
          // console.log("did I make it here?");
          await e.save();
        }
      }
      // console.log("out of here?");
      job.mostRecentEmailSent = mostRecentDate;

      await job.save();
    }
    res.send();
  } catch (err) {
    res.status(500).send(err);
  }
});

//create new job
router.post("/jobs", auth, async (req, res) => {
  if (req.body.website[0] === "h") {
    console.log("in the edit");
    req.body.website = req.body.website.split("/")[2];
  }

  const job = new Job({ ...req.body, owner: req.user._id });

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

  const allowedUpdates = ["response", "status", "notes"];

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

module.exports = router;
