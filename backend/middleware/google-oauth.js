const User = require("../models/User");

const googleOAuth = async (req, res, next) => {
  try {
    const { googleId, email, name, imageUrl } = req.body.user;

    const existingUser = await User.findOne({
      method: "google",
      "google.id": googleId
    });

    if (existingUser) {
      req.user = existingUser;
      return next();
    }

    const newUser = await new User({
      name,
      method: "google",
      "google.id": googleId,
      "google.email": email,
      imageUrl: imageUrl
    });

    await newUser.save();

    req.user = newUser;
    next();
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = googleOAuth;
