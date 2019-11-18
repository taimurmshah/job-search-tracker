const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");
const googleOAuth = require("../middleware/google-oauth");

const router = new express.Router();
const passport = require("passport");
const passportConf = require("../middleware/passport");

//create new user
router.post("/users", async (req, res) => {
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
  const { email, password } = req.body;

  try {
    const user = await User.findByCredentials({ email, password });
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (err) {
    res.status(400).send();
  }
});

// google oauth
router.post("/oauth/google", googleOAuth, async (req, res) => {
  try {
    const user = req.user;
    const token = await user.generateAuthToken();
    // console.log({ user });
    // console.log({ token });
    res.send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
});

// // google oauth create
// router
//   .route("/oauth/google")
//   .post(
//     passport.authenticate("googleToken", { session: false }),
//     async (req, res) => {
//       console.log({ req });
//       try {
//         const user = req.user;
//         const token = await user.generateAuthToken();
//         res.send({ user, token });
//       } catch (err) {
//         res.status(400).send(err);
//       }
//     }
//   );

//logout
router.post("/logout", auth, async (req, res) => {
  try {
    const user = req.user;
    user.tokens = user.tokens.filter(token => token.token !== req.token);

    await user.save();

    res.send({ message: "You have successfully logged out" });
  } catch (err) {
    res.status(500).send();
  }
});

//logout all sessions
router.post("/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (err) {
    res.status(500).send();
  }
});

//get my profile
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

//update myself
router.patch("/users/me", auth, async (req, res) => {
  try {
    const user = req.user;
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password"];

    const isValidOperation = updates.every(update =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      res.status(400).send("Invalid update parameters");
    }

    updates.forEach(update => {
      user[update] = req.body[update];
    });

    await user.save();

    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

//delete me
router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
