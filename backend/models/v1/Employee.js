const mongoose = require("mongoose");
const validator = require("validator");

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Please enter valid email");
        }
      }
    },
    position: {
      type: String,
      required: true,
      trim: true
    },
    response: {
      type: Boolean
    },
    linkedIn: {
      type: String,
      required: true,
      trim: true
    },
    notes: {
      type: String,
      trim: true
    },
    emailsSent: [
      {
        method: {
          type: String,
          enum: ["custom", "template"],
          required: true
        },
        template_id: {
          type: String
        },
        time: { type: Date, default: new Date() }
      }
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Job"
    }
  },
  {
    timestamps: true,
    autoIndex: false
  }
);

// employeeSchema.pre("save", async function(next) {
//   const employee = this;
//
//   //todo cleanup
//
//   next();
// });

employeeSchema.set("autoIndex", false);

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
