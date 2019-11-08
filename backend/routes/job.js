const express = require("express");
const auth = require("../middleware/auth");
const Job = require("../models/Job");

const router = new express.Router();

//create new job
router.post("/jobs", auth, async (req, res) => {
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
    res.send(user.jobs);
  } catch (err) {
    res.status(500).send(err);
  }
});

//view one job by id
router.get("/jobs/:id", auth, async (req, res) => {
  console.log("req.params:", req.params);
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
  // let possibleUpdates = { description: true, completed: true };
  // for (let i = 0; i < updates.length; i++) {
  //   if (!possibleUpdates[updates[i]]) {
  //     return res.status(400).send({ error: "Invalid update parameters." });
  //   }
  // }

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
