const express = require("express");
const router = new express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const auth = require("../middleware/auth");

//create new user
router.post("/users", async (req, res) => {
  //take req name, email, and password, and somehow save it.
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (err) {
    res.status(400).send("Cannot create new user");
  }
});

//login
router.post("/login", async (req, res) => {
  const user = await User.findByCredentials(req.body.email, req.body.password);
  try {
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
});
//logout
router.post("/logout", auth, async (req, res) => {
  try {
    const user = req.user;
    user.tokens = user.tokens.filter(token => token.token !== req.token);

    await user.save();

    res.send("You have successfully logged out");
  } catch (err) {
    res.status(500).send();
  }
});

//get my profile
//delete my profile

module.exports = router;
