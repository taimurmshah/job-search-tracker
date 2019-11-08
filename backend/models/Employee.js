const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      trim: true
    },
    position: {
      type: String,
      trim: true
    },
    response: {
      type: Boolean,
      default: false
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Job"
    }
  },
  {
    timestamps: true
  }
);

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
