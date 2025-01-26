const messageRouter = require("express").Router();
const MessageController = require("../controllers/message.controller");
const JwtMiddleware = require("../middleware/jwtMiddleware");
const multerMiddleware = require("../middleware/multerMiddleware");

// get conversation messages
messageRouter.get(
  "/:userToChatUserId",
  JwtMiddleware.verifyAccessToken,
  MessageController.getMessages
);

// create message
messageRouter.post(
  "/:userToChatUserId",
  JwtMiddleware.verifyAccessToken,
  multerMiddleware.any(),
  MessageController.createMessage
);

// delete messages
messageRouter.delete(
  "/:userToChatUserId/:messageIds",
  JwtMiddleware.verifyAccessToken,
  MessageController.deleteMessages
);

/**
 * Complete endpoint examples
 * 1. get messages - GET - http://localhost:5000/api/message/:userToChatUserId
 * 2. create message - POST - http://localhost:5000/api/message/:userToChatUserId
 * 3. delete messages - DELETE - http://localhost:5000/api/message/:userToChatUserId
 */

module.exports = messageRouter;
