const UserController = require("../controllers/user.controller");
const userRouter = require("express").Router();
const JwtMiddleware = require("../middleware/jwtMiddleware");
const multerMiddleware = require("../middleware/multerMiddleware");

// get user profile (Authorized user)
userRouter.get(
  "/profile",
  JwtMiddleware.verifyAccessToken,
  UserController.getProfile
);

// update profile picture (Authorized user)
userRouter.put(
  "/update-dp",
  JwtMiddleware.verifyAccessToken,
  multerMiddleware.single("dp"),
  UserController.updateProfilePicture
);

// update profile info (Authorized user)
userRouter.put(
  "/update-info",
  JwtMiddleware.verifyAccessToken,
  UserController.updateProfileInfo
);

/**
 * Complete endpoint examples
 * 1. get profile - GET - http://localhost:5000/api/user/profile
 * 2. update dp - PUT - http://localhost:5000/api/user/update-dp
 * 3. update info - PUT - http://localhost:5000/api/user/update-info
 */

module.exports = userRouter;
