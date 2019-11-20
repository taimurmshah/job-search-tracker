const express = require("express");
const cors = require("cors");
const userRouter = require("./backend/routes/user");
const jobRouter = require("./backend/routes/job");
const employeeRouter = require("./backend/routes/employee");
const emailRouter = require("./backend/routes/email");
const googleRouter = require("./backend/routes/google");

require("dotenv").config();

const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

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
app.use(googleRouter);

const port = process.env.PORT || 5000;

// app.get("/", async (req, res) => {
//   const oauth2Client = new OAuth2(
//     process.env.OAUTH_CLIENT,
//     process.env.OAUTH_SECRET,
//     process.env.REDIRECT_URI
//   );
//
//   const { tokens } = await oauth2Client.getToken(
//     "4/tQFzs2rfFLvwjqrcgHkfelCTNAhy0aMUtv2Ub0_63PgPFMuZQ6tUA3b_BcpQBYu7VnywWfiHoJok652DMncMsH8"
//   );
//   console.log({ tokens });
// });

app.listen(port, () => {
  console.log("Server is running on port:" + port);
});

//refresh_token: '1//050wi5ERfltePCgYIARAAGAUSNwF-L9IrEpx0bMyRVHGEOCSaI-1FbMIa5jLSgKttXoUjxB_piYVenpsI_rI4iusFrYMKRrDr_Bw'
