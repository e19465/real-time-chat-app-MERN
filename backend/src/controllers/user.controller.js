const ErrorHandler = require("../helpers/ErrorHandler");
const User = require("../models/User");
const SuccessHandler = require("../helpers/SuccessHandler");
const FilesUploadService = require("../services/FilesUploadService");

class UserController {
  //! get user profile (Authorized user)
  async getProfile(req, res) {
    try {
      const userId = req.user.userId;
      const user = await User.findById(userId);
      if (!user) {
        return ErrorHandler.handle404("User not found", res);
      }
      const { password, ...rest } = user._doc;
      return SuccessHandler.handle200(
        "User profile info fetched successfully",
        rest,
        res
      );
    } catch (err) {
      console.log("Error fetching user profile", err);
      return ErrorHandler.handle500AndCustomError(err, res);
    }
  }

  //! get users (Authorized user)
  async getUsers(req, res) {
    try {
      const userId = req.user.userId;
      const users = await User.find({
        _id: { $ne: userId },
      }).select({
        _id: 1,
        fullName: 1,
        email: 1,
        profilePic: 1,
      });
      return SuccessHandler.handle200("Users fetched successfully", users, res);
    } catch (err) {
      console.log("Error fetching users", err);
      return ErrorHandler.handle500AndCustomError(err, res);
    }
  }

  //! update profile picture (Authorized user)
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
      console.log("Error updating profile picture", err);
      return ErrorHandler.handle500AndCustomError(err, res);
    }
  }

  //! update profile info (Authorized user)
  async updateProfileInfo(req, res) {
    try {
      const userId = req.user.userId;
      const savedUser = await User.findByIdAndUpdate(
        userId,
        { $set: req.body },
        { new: true }
      );
      return SuccessHandler.handle200("Profile info updated", savedUser, res);
    } catch (err) {
      console.log("Error updating profile info", err);
      return ErrorHandler.handle500AndCustomError(err, res);
    }
  }
}

module.exports = new UserController();
