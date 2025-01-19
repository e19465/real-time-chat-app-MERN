const mongoose = require("mongoose");
const serverRoutes = require("./routes");
const dotenv = require("dotenv");

//! configurations
dotenv.config();

//! Connect to the database initially
function connectToDatabaseAndStartServer(app) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to MongoDB");
      //! After successful database connection, server the routes
      serverRoutes(app);
    })
    .catch((err) => {
      console.log("Error connecting to MongoDB:", err.message);
      if (connectToDatabaseAndStartServer.retryAttempts < 4) {
        console.log("Retrying database connection in 4 seconds...");
        setTimeout(connectToDatabaseAndStartServer, 4000);
        connectToDatabaseAndStartServer.retryAttempts++;
      } else {
        console.log("Maximum retry attempts reached. Exiting...");
        process.exit(1);
      }
    });
}
connectToDatabaseAndStartServer.retryAttempts = 0; // Initialize retry attempts counter

module.exports = connectToDatabaseAndStartServer;
