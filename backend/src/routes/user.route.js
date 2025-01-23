const UserController = require("../controllers/user.controller");
const userRouter = require("express").Router();
const JwtMiddleware = require("../middleware/jwtMiddleware");
const multerMiddleware = require("../middleware/multerMiddleware");

// get user profile (Authorized user)
userRouter.get(
  "/profile/:userId",
  JwtMiddleware.verifyAccessToken,
  UserController.getProfile
);

// get users (Authorized user)
userRouter.get(
  "/users",
  JwtMiddleware.verifyAccessToken,
  UserController.getUsers
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
 * 4. get users - GET - http://localhost:5000/api/user/users
 */

module.exports = userRouter;
