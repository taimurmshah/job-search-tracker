const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("config");

const auth = async (req, res, next) => {
  try {
    console.log("in the auth method");
    console.log("req.headers:", req.headers);
    const token =
      req.headers.authorization[0] === "B"
        ? req.headers.authorization.split(" ")[1]
        : req.headers.authorization;

    console.log({ token });

    const decoded = await jwt.decode(token, config.get("secret"));
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token
    });
    if (!user) throw new Error();

    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

module.exports = auth;
