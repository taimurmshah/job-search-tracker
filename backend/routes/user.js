const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");
const googleOAuth = require("../middleware/google-oauth");
const multer = require("multer");

const router = new express.Router();

//create new user
router.post("/users", async (req, res) => {
  const { method, email, name, password } = req.body;

  const user = new User({
    method,
    "local.email": email,
    "local.password": password,
    name
  });

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (err) {
    res.status(400).send({ err });
  }
});

//login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByCredentials(email, password);

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

//resume upload ish:
const upload = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    // if (!file.originalname.match(/\.(pdf|doc|docx|rtf)$/)) {
    //   return cb(
    //     new Error(
    //       "Please upload a valid file type. " +
    //         "File types accepted: " +
    //         ".pdf, .doc, .docx, .rtf"
    //     )
    //   );
    // }

    //right now only taking pdfs
    if (!file.originalname.match(/\.pdf$/)) {
      return cb(new Error("Please upload a PDF."));
    }

    cb(undefined, true);
  }
});

//upload user's resume
router.post(
  "/users/me/resume",
  auth,
  upload.single("resume"),
  async (req, res) => {
    try {
      console.log("upload resume try");
      req.user.resume = req.file.buffer;
      await req.user.save();
      res.send();
    } catch (err) {
      res.status(400).send({ err });
    }
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

//get my resume
router.get("/users/me/resume", auth, async (req, res) => {
  try {
    const user = req.user;
    const resume = user.resume;

    if (!resume) {
      throw new Error();
    }

    res.set("Content-Type", "application/pdf");
    res.send(resume);
  } catch (err) {}
});

//update user's resume
router.patch(
  "/users/me/resume",
  auth,
  upload.single("resume"),
  async (req, res) => {
    try {
      req.user.resume = req.file.buffer;
      await req.user.save();
      res.send();
    } catch (err) {
      res.status(400).send({ err });
    }
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

//delete resume
router.delete("/users/me/resume", auth, async (req, res) => {
  try {
    const user = req.user;

    user.resume = undefined;

    await user.save();

    res.send({ user, message: "Resume has been deleted" });
  } catch (err) {
    res.status(400).send({ err });
  }
});

module.exports = router;
