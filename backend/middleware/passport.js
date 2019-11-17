const passport = require("passport");
const GooglePlusTokenStrategy = require("passport-google-plus-token");
const User = require("../models/User");

//Google OAuth strategy
passport.use(
  "googleToken",
  new GooglePlusTokenStrategy(
    {
      clientID:
        "602278501830-rphr8gpcgsbitjkn43gcej296j9723sh.apps.googleusercontent.com",
      clientSecret: "ePV_FcVyr7etPofcaN4pmYcL"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // console.log({ accessToken });
        // console.log({ refreshToken });
        // console.log({ profile });
        // console.log("email:", profile.emails);
        //check if user exists
        const existingUser = await User.findOne({ "google.id": profile.id });

        if (existingUser) {
          return done(null, existingUser);
        }

        //if new account:
        const newUser = new User({
          method: "google",
          name: profile.displayName,
          google: {
            id: profile.id,
            email: profile.emails[0].value
          }
        });
        await newUser.save();

        console.log({ newUser });

        done(null, newUser);
      } catch (err) {
        done(err, false, err.message);
      }
    }
  )
);
