const express = require("express");
const auth = require("../middleware/auth");
const JobSearch = require("../models/JobSearch");
const job = require("../../client/src/redux/reducers/job");
const Job = require("../../client/src/redux/reducers/job");

const router = new express.Router();

//create new job search
router.post("/searches", auth, async (req, res) => {
  const jobSearch = new JobSearch({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await jobSearch.save();

    res.send(jobSearch);
  } catch (err) {
    res.status(400).send(err);
  }
});

//view all job searches
router.get("/searches", auth, async (req, res) => {
  try {
    const user = req.user;
    await user
      .populate({
        path: "jobSearches",
      })
      .execPopulate();

    let jobSearches = user.jobSearches;

    res.send(jobSearches);
  } catch (err) {
    res.status(500).send(err);
  }
});

//get job search by id
router.get("/searches/:id", auth, async (req, res) => {
  try {
    const jobSearch = await JobSearch.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!jobSearch) return res.status(400).send();

    res.send(jobSearch);
  } catch (err) {
    res.status(500).send(err);
  }
});

//update job search
router.patch("/searches/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  // console.log("updates:", updates);

  const allowedUpdates = ["title", "currentSession", "startDate", "endDate"];

  for (let i = 0; i < updates.length; i++) {
    if (!allowedUpdates.includes(updates[i])) {
      return res.status(400).send({ error: "Invalid update parameters." });
    }
  }

  try {
    let _id = req.params.id;

    const jobSearch = await JobSearch.findOne({ _id, owner: req.user._id });

    if (!jobSearch) return res.status(404).send();

    updates.forEach((update) => (jobSearch[update] = req.body[update]));

    await jobSearch.save();

    res.send(jobSearch);
  } catch (err) {
    res.status(400).send(err);
  }
});

//delete job search
router.delete("/searches/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const jobSearch = await JobSearch.findOneAndDelete({
      _id,
      owner: req.user._id,
    });

    if (!jobSearch) return res.status(400).send();

    res.send(jobSearch);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
