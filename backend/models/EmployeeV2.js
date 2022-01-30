const mongoose = require("mongoose");
const validator = require("validator");

const employeeV2Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Please enter valid email");
        }
      },
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
    response: {
      type: Boolean,
    },
    linkedIn: {
      type: String,
      required: true,
      trim: true,
    },
    emailsSent: [
      {
        method: {
          type: String,
          enum: ["custom", "template"],
          required: true,
        },
        template_id: {
          type: String,
        },
        time: { type: Date, default: new Date() },
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Company",
    },
  },
  {
    timestamps: true,
    autoIndex: false,
  }
);

employeeV2Schema.set("autoIndex", false);

const EmployeeV2 = mongoose.model("EmployeeV2", employeeV2Schema);

module.exports = EmployeeV2;
