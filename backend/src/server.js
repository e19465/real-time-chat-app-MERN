const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");
const serveRoutes = require("./routes");
const connectToMongoDB = require("./db");
const { app, io, server } = require("./config/socket");
const { initializeSocketListeners } = require("./helpers/SocketHandler");

//! configurations
dotenv.config();
const PORT = process.env.PORT || 5000;

//! middlewares
// CORS middleware
app.use(cors(corsOptions));

// middleware for parsing cookies
app.use(cookieParser());

// Parse URL-encoded bodies (HTML form data)
app.use(bodyParser.urlencoded({ extended: true }));

// middleware for json()
app.use(express.json());

// Serve static files from the "static" directory
app.use(express.static(path.join(__dirname, "..", "static")));

//! connect to MongoDB and serve routes and start server
connectToMongoDB()
  .then(() => {
    //! Serve routes
    serveRoutes(app);

    //! initialize socket listeners
    initializeSocketListeners();

    //! app listening to port
    server.listen(PORT, () => {
      console.log(`Chat MERN server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Something went wrong: ", err);
    process.exit(1);
  });
