const ErrorHandler = require("../helpers/ErrorHandler");
const User = require("../models/User");
const SuccessHandler = require("../helpers/SuccessHandler");
const FilesUploadService = require("../services/FilesUploadService");

class UserController {
  async updateProfilePicture(req, res) {
    try {
      const userId = req.user.userId;
      const user = await User.findById(userId);
      if (!user) {
        return ErrorHandler.handle404("User not found", res);
      }
      const fileUploadResponse =
        await FilesUploadService.uploadFilesAndGiveUrls(req, "user-dp");
      const imageUrl = fileUploadResponse[0];
      user.profilePic = imageUrl;
      await user.save();
      return SuccessHandler.handle200("Profile picture updated", null, res);
    } catch (err) {
      return ErrorHandler.handle500AndCustomError(err, res);
    }
  }

  async updateProfileInfo(req, res) {
    try {
      const userId = req.user.userId;
      const user = await User.findById(userId);
      if (!user) {
        return ErrorHandler.handle404("User not found", res);
      }
      return SuccessHandler.handle200("Profile info updated", null, res);
    } catch (err) {
      return ErrorHandler.handle500AndCustomError(err, res);
    }
  }
}

module.exports = new UserController();
