const express = require("express");
const auth = require("../middleware/auth");
const Template = require("../models/v1/Template");

const router = new express.Router();

//create new template
router.post("/templates", auth, async (req, res) => {
  const template = new Template({ ...req.body, owner: req.user._id });

  try {
    await template.save();
    console.log({ template });
    res.send(template);
  } catch (err) {
    console.log(
      "in the create new template route error, here's the error:",
      err
    );
    res.status(400).send(err);
  }
});

//view all my templates
router.get("/templates", auth, async (req, res) => {
  try {
    const user = req.user;
    await user
      .populate({
        path: "templates"
      })
      .execPopulate();
    res.send(user.templates);
  } catch (err) {
    res.status(500).send(err);
  }
});

//get template by id
router.get("/templates/:id", auth, async (req, res) => {
  try {
    const template = await Template.findOne({
      _id: req.params.id,
      owner: req.user._id
    });
    if (!template) {
      return res.status(400).send();
    }

    res.send(template);
  } catch (err) {
    res.status(500).send();
  }
});

//update template
router.patch("/templates/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);

  const allowedUpdates = [
    "name",
    "subject",
    "message",
    "withResume",
    "interpolationValues"
  ];

  for (let i = 0; i < updates.length; i++) {
    if (!allowedUpdates.includes(updates[i])) {
      return res.status(400).send({ error: "Invalid update parameters." });
    }
  }

  try {
    let _id = req.params.id;

    const template = await Template.findOne({ _id, owner: req.user._id });

    if (!template) return res.status(404).send();

    updates.forEach(update => (template[update] = req.body[update]));

    await template.save();

    res.send(template);
  } catch (err) {
    res.status(400).send(err);
  }
});

//delete template
router.delete("/template/:id", auth, async (req, res) => {
  try {
    const template = await Template.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!template) return res.status(400).send();

    res.send(template);
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
