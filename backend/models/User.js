const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Please enter valid email");
        }
      }
    },
    password: {
      type: String,
      minlength: 7,
      required: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("Password entry cannot contain 'password'.");
        }
      }
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

userSchema.methods.toJSON = function() {
  const user = this;
  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.tokens;

  return userObj;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error("Cannot log in");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error("Cannot log in");

  return user;
};

userSchema.pre("save", async function(next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

userSchema.methods.generateAuthToken = async function() {
  const user = this;

  let token = await jwt.sign({ _id: user._id }, config.get("secret"));

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
