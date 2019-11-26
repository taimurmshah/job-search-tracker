const mongoose = require("mongoose");
const validator = require("validator");

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Please enter valid email");
        }
      }
    },
    position: {
      type: String,
      required: true,
      trim: true
    },
    response: {
      type: Boolean
    },
    linkedIn: {
      type: String,
      required: true,
      trim: true
    },
    notes: {
      type: String,
      trim: true
    },
    possibleEmails: [
      {
        email: {
          type: String,
          trim: true
        }
      }
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Job"
    }
  },
  {
    timestamps: true,
    autoIndex: false
  }
);

employeeSchema.set("autoIndex", false);

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
