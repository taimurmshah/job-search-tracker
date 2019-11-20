const express = require("express");
const router = new express.Router();
const googleOAuth = require("../middleware/new-google-oauth");

router.post("/google/oauth/try", googleOAuth, async (req, res) => {});

router.get("/google/callback", async (req, res) => {
  try {
    console.log("req.params:", req.params);
  } catch (err) {}
});

module.exports = router;
