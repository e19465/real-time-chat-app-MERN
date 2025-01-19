const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const corsOptions = require("./config/corsOptions");
const connectToDatabaseAndStartServer = require("./db");

// configurations
const app = express();
dotenv.config();

//! middlewares
// CORS middleware
app.use(cors(corsOptions));

// Parse URL-encoded bodies (HTML form data)
app.use(bodyParser.urlencoded({ extended: true }));

// middleware for json()
app.use(express.json());

// Serve static files from the "static" directory
app.use(express.static(path.join(__dirname, "..", "static")));

//! Connect to the database initially
connectToDatabaseAndStartServer(app);
