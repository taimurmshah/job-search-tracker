const express = require("express");
const userRouter = require("./backend/routes/user");
const jobRouter = require("./backend/routes/job");

//Connect Database
require("./config/db");

const app = express();
const port = process.env.PORT || 6000;

app.use(express.json());
app.use(userRouter);
app.use(jobRouter);

app.listen(port, () => {
  console.log("Server is running on port:" + port);
});
