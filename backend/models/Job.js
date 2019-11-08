const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      trim: true,
      required: true
    },
    link: {
      type: String,
      trim: true,
      required: true
    },
    response: {
      type: Boolean,
      default: false
    },
    /* status as in, false = rejected & true = currently interviewing */
    status: {
      type: Boolean
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

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
