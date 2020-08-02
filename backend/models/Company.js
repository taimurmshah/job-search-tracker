const mongoose = require("mongoose");
const Job2 = require("./Job2");
const Employee2 = require("./Employee2");

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

companySchema.virtual("jobs2", {
  ref: "Job2",
  localField: "_id",
  foreignField: "owner"
});

companySchema.virtual("employees2", {
  ref: "Employee2",
  localField: "_id",
  foreignField: "owner"
});

companySchema.pre("remove", async function(next) {
  const company = this;
  await Job2.deleteMany({ owner: company._id });
  await Employee2.deleteMany({ owner: company._id });
  next();
});

const Company = mongoose.model("Company", companySchema);
module.exports = Company;
