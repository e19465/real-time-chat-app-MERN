const multer = require("multer");

// Configure multer to use memory storage (files will be stored in memory as Buffer)
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB file size limit
  },
  fileFilter: (req, file, cb) => {
    // Optional: Validate file type
    // Allow all file types for generic use
    cb(null, true);
  },
});

module.exports = upload;
