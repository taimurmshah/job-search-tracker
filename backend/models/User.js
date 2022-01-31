const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const Job = require("./Job");
const Template = require("./Template");

const userSchema = new mongoose.Schema(
  {
    method: {
      type: String,
      enum: ["local", "google"],
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    local: {
      email: {
        type: String,
        trim: true,
        validate(value) {
          if (!validator.isEmail(value)) {
            throw new Error("Please enter valid email");
          }
        },
      },
      password: {
        type: String,
        minlength: 7,
        validate(value) {
          if (value.toLowerCase().includes("password")) {
            throw new Error("Password entry cannot contain 'password'.");
          }
        },
      },
    },
    google: {
      id: {
        type: String,
      },
      email: {
        type: String,
        lowercase: true,
      },
      refresh_token: {
        type: String,
      },
      access_token: {
        type: String,
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    resume: {
      type: Buffer,
    },
    imageUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("jobSearches", {
  ref: "JobSearch",
  localField: "_id",
  foreignField: "owner",
});

userSchema.virtual("companies", {
  ref: "Company",
  localField: "_id",
  foreignField: "owner",
});

userSchema.virtual("jobs", {
  ref: "Job",
  localField: "_id",
  foreignField: "owner",
});

userSchema.virtual("templates", {
  ref: "Template",
  localField: "_id",
  foreignField: "owner",
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.method !== "local") {
    next();
  }

  if (user.isModified("local.password")) {
    user.local.password = await bcrypt.hash(user.local.password, 8);
  }

  next();
});

userSchema.methods.toJSON = function () {
  const user = this;

  const userObj = user.toObject();

  if (user.method === "local") {
    delete userObj.local.password;
  }

  if (user.method === "google") {
    delete userObj.google.refresh_token;
    delete userObj.google.access_token;
  }

  userObj.resume ? (userObj.resume = true) : (userObj.resume = false);

  delete userObj.tokens;

  return userObj;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ method: "local", "local.email": email });

  if (!user) throw new Error("Cannot log in");

  const isMatch = await bcrypt.compare(password, user.local.password);

  if (!isMatch) throw new Error("Cannot log in");

  return user;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;

  let token = await jwt.sign({ _id: user._id }, config.get("secret"));

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

userSchema.pre("remove", async function (next) {
  const user = this;
  await Job.deleteMany({ owner: user._id });
  await Template.deleteMany({ owner: user._id });
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
