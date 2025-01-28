const { Server } = require("socket.io");
const express = require("express");
const http = require("http");
require("dotenv").config();

//! environment variables
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");
const allowedHeaders = process.env.ALLOWED_HEADERS.split(",");
const allowCredentials = process.env.ALLOW_CREDENTIALS === "true";
const allowedMethods = process.env.ALLOWED_METHODS.split(",");

//! configuration
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: allowCredentials,
    allowedHeaders: allowedHeaders,
    methods: allowedMethods,
  },
});

module.exports = { app, server, io };
