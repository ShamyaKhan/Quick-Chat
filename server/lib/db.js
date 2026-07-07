const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Connected to Database!");
    });
    await mongoose.connect(`${process.env.MONGODB_URI}`);
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
