const mongoose = require("mongoose");

const jobSearchSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    currentSession: {
      type: Boolean,
      required: true,
      default: false,
    },
    startDate: {
      type: Date,
      required: true,
      default: new Date(),
    },
    endDate: {
      type: Date,
      required: true,
      default: null,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const JobSearch = mongoose.model("JobSearch", jobSearchSchema);

module.exports = JobSearch;
