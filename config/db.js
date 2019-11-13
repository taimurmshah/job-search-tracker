const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectToDB = async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      autoIndex: false
    });

    console.log("MongoDB Connected...");
  } catch (err) {
    console.error({ err });
    // Exit process with failure
    process.exit(1);
  }
};

connectToDB();
