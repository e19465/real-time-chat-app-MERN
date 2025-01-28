require("dotenv").config();
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");
const allowedHeaders = process.env.ALLOWED_HEADERS.split(",");
const allowCredentials = process.env.ALLOW_CREDENTIALS === "true";
const allowedMethods = process.env.ALLOWED_METHODS.split(",");

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
  methods: allowedMethods,
};

module.exports = corsOptions;
