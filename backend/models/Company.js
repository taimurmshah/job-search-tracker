const mongoose = require("mongoose");
const Employee = require("./Employee");
const JobListing = require("./JobListing");

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    linkedIn: {
      type: String,
      required: true,
    },
    careersPage: {
      type: String,
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

companySchema.virtual("jobListings", {
  ref: "JobListing",
  localField: "_id",
  foreignField: "owner",
});

companySchema.virtual("jobs", {
  ref: "Job",
  localField: "_id",
  foreignField: "owner",
});

companySchema.virtual("employees", {
  ref: "Employee",
  localField: "_id",
  foreignField: "owner",
});

companySchema.pre("remove", async function (next) {
  const job = this;
  await JobListing.deleteMany({ owner: job._id });
  next();
});

companySchema.pre("remove", async function (next) {
  const job = this;
  await Employee.deleteMany({ owner: job._id });
  next();
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
