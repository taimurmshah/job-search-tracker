const mongoose = require("mongoose");

const job2Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    link: {
      type: String,
      trim: true,
      required: true
    },
    progress: [
      {
        type: String,
        enum: [
          "Haven't Applied Yet",
          "Applied",
          "Recruiter Call",
          "Technical Call",
          "Code Challenge",
          "Onsite",
          "Offer",
          "Rejected"
        ],
        default: "Haven't Applied Yet"
      }
    ],
    mostRecentEmailSent: {
      type: Date
    },
    numOfEmailsSent: {
      type: Number,
      default: 0
    },
    notes: {
      type: String,
      trim: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Company"
    }
  },
  { timestamps: true }
);

const Job2 = mongoose.model("Job2", job2Schema);

module.exports = Job2;
