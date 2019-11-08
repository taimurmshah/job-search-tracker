const express = require("express");
const userRouter = require("./backend/routes/user");

//Connect Database
require("./config/db");

const app = express();
const port = process.env.PORT || 6000;

app.use(express.json());
app.use(userRouter);

app.listen(port, () => {
  console.log("Server is running on port:" + port);
});
