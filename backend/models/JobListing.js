const mongoose = require("mongoose");
const Employee = require("./Employee");

const jobListingSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    response: {
      type: Boolean,
      default: false,
    },
    mostRecentEmailSent: {
      type: Date,
    },
    numOfEmailsSent: {
      type: Number,
      default: 0,
    },
    notes: {
      type: String,
      trim: true,
    },
    progress: [
      {
        type: String,
        enum: [
          "Applied",
          "Recruiter Call",
          "Code Challenge",
          "Onsite",
          "Offer",
          "Rejected",
        ],
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Company",
    },
  },
  {
    timestamps: true,
  }
);

const JobListing = mongoose.model("JobListing", jobListingSchema);

module.exports = JobListing;
