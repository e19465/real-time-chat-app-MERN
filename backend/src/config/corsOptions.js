require("dotenv").config();
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");
const allowedHeaders = process.env.ALLOWED_HEADERS.split(",");
const allowCredentials = process.env.ALLOW_CREDENTIALS === "true";

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: allowCredentials,
  optionsSuccessStatus: 200,
  allowedHeaders: allowedHeaders,
};

module.exports = corsOptions;
