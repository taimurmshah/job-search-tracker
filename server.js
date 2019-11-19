const express = require("express");
const cors = require("cors");
const userRouter = require("./backend/routes/user");
const jobRouter = require("./backend/routes/job");
const employeeRouter = require("./backend/routes/employee");
const emailRouter = require("./backend/routes/email");
// require("./nodemailer-test");
//Connect Database
require("./config/db");

const app = express();
app.use(cors());

// app.use((req, res, next) => {
//   console.log("hitting");
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });

app.use(express.json({ extended: false }));

app.use(userRouter);
app.use(jobRouter);
app.use(employeeRouter);
app.use(emailRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server is running on port:" + port);
});
