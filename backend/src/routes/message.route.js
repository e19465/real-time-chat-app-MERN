const messageRouter = require("express").Router();
const MessageController = require("../controllers/message.controller");
const JwtMiddleware = require("../middleware/jwtMiddleware");

// get conversation messages
messageRouter.get(
  "/:userToChatUserId",
  JwtMiddleware.verifyAccessToken,
  MessageController.getMessages
);

/**
 * Complete endpoint examples
 * 1. get messages - GET - http://localhost:5000/api/message/:userToChatUserId
 */

module.exports = messageRouter;
