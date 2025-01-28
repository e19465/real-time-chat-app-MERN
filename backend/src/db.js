const mongoose = require("mongoose");
const dotenv = require("dotenv");

//! configurations
dotenv.config();

//! Connect to the database initially
async function connectToMongoDB() {
  let retryAttempts = 0;
  const maxRetries = process.env.MONGO_MAX_CONNECTION_RETRIES || 5;

  while (retryAttempts < maxRetries) {
    try {
      await mongoose.connect(process.env.MONGODB_CONNECTION_URI);
      console.log("Connected to MongoDB Atlas :)");
      return; // Exit the function on a successful connection
    } catch (err) {
      retryAttempts++;
      console.log(
        `Error connecting to MongoDB (Attempt ${retryAttempts}/${maxRetries}):`,
        err.message
      );

      if (retryAttempts < maxRetries) {
        console.log("Retrying database connection in 4 seconds...");
        await new Promise((resolve) => setTimeout(resolve, 4000)); // Wait 4 seconds before retrying
      } else {
        console.log("Maximum retry attempts reached. Exiting...");
        process.exit(1); // Exit the process if max retries are reached
      }
    }
  }
}

module.exports = connectToMongoDB;
