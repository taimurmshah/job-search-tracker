const express = require("express");
const cors = require("cors");
const userRouter = require("./backend/routes/user");
const jobRouter = require("./backend/routes/job");
const employeeRouter = require("./backend/routes/employee");
const emailRouter = require("./backend/routes/email");

require("dotenv").config();

//Connect Database
require("./config/db");

const app = express();
app.use(cors());

app.use(express.json({ extended: false }));

app.use(userRouter);
app.use(jobRouter);
app.use(employeeRouter);
app.use(emailRouter);

//multer file upload example

const multer = require("multer");
const upload = multer({
  dest: "resumes"
});

//the name value @ upload.single must be the key name in the form-data post method.
app.post("/uploads", upload.single("upload"), (req, res) => {
  res.send();
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server is running on port:" + port);
});
