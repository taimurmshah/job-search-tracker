const mongoose = require("mongoose");
const Employee = require("./Employee");

//todo website validation (includes ".com")

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      trim: true,
      required: true
    },
    website: {
      type: String,
      required: true,
      trim: true
    },
    link: {
      type: String,
      trim: true,
      required: true
    },
    linkedIn: {
      type: String,
      trim: true,
      required: true
    },
    response: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      enum: [
        "Haven't sent email yet",
        "Waiting for email response",
        "Submitted application; waiting for company response",
        "Rejected",
        "Phone Screen",
        "On-site",
        "Offer"
      ],
      default: "Haven't sent email yet"
    },
    mostRecentEmailSent: {
      type: Date
    },
    notes: {
      type: String,
      trim: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

jobSchema.virtual("employees", {
  ref: "Employee",
  localField: "_id",
  foreignField: "owner"
});

jobSchema.pre("remove", async function(next) {
  const job = this;
  await Employee.deleteMany({ owner: job._id });
  next();
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
