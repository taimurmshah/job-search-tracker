const mongoose = require("mongoose");
const Employee = require("./Employee");
const Job = require("./Job");
const JobListing = require("./JobListing");

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
      unique: true,
    },
    endDate: {
      type: Date,
      // required: true,
      default: null,
      unique: true,
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

jobSearchSchema.virtual("jobListings", {
  ref: "JobListing",
  localField: "_id",
  foreignField: "owner",
});

jobSearchSchema.virtual("jobs", {
  ref: "Job",
  localField: "_id",
  foreignField: "jobSearch",
});

jobSearchSchema.pre("remove", async function (next) {
  const jobSearch = this;
  await Job.deleteMany({ owner: jobSearch._id });
  await JobListing.deleteMany({ owner: jobSearch._id });
  next();
});

const JobSearch = mongoose.model("JobSearch", jobSearchSchema);

module.exports = JobSearch;
