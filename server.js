const express = require("express");
const userRouter = require("./backend/routes/user");
const jobRouter = require("./backend/routes/job");
const employeeRouter = require("./backend/routes/employee");

//Connect Database
require("./config/db");

const app = express();
const port = process.env.PORT || 6000;

app.use(express.json());
app.use(userRouter);
app.use(jobRouter);
app.use(employeeRouter);

app.listen(port, () => {
  console.log("Server is running on port:" + port);
});
