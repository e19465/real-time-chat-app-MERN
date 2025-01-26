const mongoose = require("mongoose");
const dotenv = require("dotenv");

//! configurations
dotenv.config();

//! Connect to the database initially
async function connectToMongoDB(app) {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Error connecting to MongoDB:", err.message);

    if (connectToMongoDB.retryAttempts < 4) {
      console.log("Retrying database connection in 4 seconds...");
      setTimeout(connectToMongoDB, 4000, app);
      connectToMongoDB.retryAttempts++;
    } else {
      console.log("Maximum retry attempts reached. Exiting...");
      process.exit(1);
    }
  }
}

connectToMongoDB.retryAttempts = 0; // Initialize retry attempts counter

module.exports = connectToMongoDB;
