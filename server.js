const express = require("express");
const cors = require("cors");
const userRouter = require("./backend/routes/user");
const jobRouter = require("./backend/routes/job");
const employeeRouter = require("./backend/routes/employee");
const emailRouter = require("./backend/routes/email");
const templateRouter = require("./backend/routes/template");
const updateRouter = require("./backend/routes/model-updates");

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
app.use(templateRouter);
app.use(updateRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server is running on port:" + port);
});
