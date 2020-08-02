const mongoose = require("mongoose");
const Job = require("./Job2");

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    website: {
      type: String,
      required: true,
      trim: true
    },
    linkedIn: {
      type: String,
      required: true,
      trim: true
    },
    careersPage: {
      type: String,
      required: true,
      trim: true
    }
  },
  { timestamps: true }
);

companySchema.virtual("jobs", {
  ref: "Job",
  localField: "_id",
  foreignField: "owner"
});

companySchema.pre("remove", async function(next) {
  const company = this;
  await Job.deleteMany({ owner: company._id });
  next();
});

const Company = mongoose.model("Company", companySchema);
module.exports = Company;
