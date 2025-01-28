//! >> Define all environment variables in .env file in local development << !//
//! >> Supply these all environment variables in production environment << !//

// Databse URI
const MONGODB_CONNECTION_URI =
  "mongodb+srv://sasindudil0002:xrIktyXOrrFcDhZj@chat-mern.8z2th.mongodb.net/chat_db?retryWrites=true&w=majority&appName=chat-mern";

// App Settings
const PORT = 5000;
const NODE_ENV = "development";
const MONGO_MAX_CONNECTION_RETRIES = 5;

// CORS
const ALLOWED_ORIGINS = "http://localhost:5173,http://localhost:5000";
const ALLOWED_HEADERS =
  "Origin, X-Requested-With, Content-Type, Accept, Authorization";
const ALLOWED_METHODS = "GET, POST, PUT, DELETE, OPTIONS";
const ALLOW_CREDENTIALS = "true";

// JWT
const ACCESS_TOKEN_SECRET = "";
const REFRESH_TOKEN_SECRET = "";

// Google OAuth and Email
const SD_CHAT_SUPPORT_EMAIL = "sdchatmern@gmail.com";
const APP_EMAIL = "sdchatmern@gmail.com";
const APP_EMAIL_PASSWORD = "mqgrtnckzfkenehf";

// Cloudinary
const CLOUDINARY_CLOUD_NAME = "";
const CLOUDINARY_API_KEY = "";
const CLOUDINARY_API_SECRET = "";
