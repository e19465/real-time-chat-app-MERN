const ErrorHandler = require("../helpers/ErrorHandler");
const SuccessHandler = require("../helpers/SuccessHandler");
const Message = require("../models/Message");
const User = require("../models/User");

class MessageController {
  async createMessage(req, res) {
    try {
      //TODO
      return SuccessHandler.handle201("Message created successfully", {}, res);
    } catch (err) {
      console.log("Error creating message", err);
      return ErrorHandler.handle500AndCustomError(err, res);
    }
  }

  //! get conversation messages
  async getMessages(req, res) {
    try {
      const myUserId = req.user.userId;
      const userToChatUserId = req.params.userToChatUserId;

      if (!myUserId) {
        return ErrorHandler.handle400("Current user id is required", res);
      }

      if (!userToChatUserId) {
        return ErrorHandler.handle400("User to chat user id is required", res);
      }

      const messages = await Message.find({
        $or: [
          { senderId: myUserId, receiverId: userToChatUserId },
          { senderId: userToChatUserId, receiverId: myUserId },
        ],
      }).sort({ createdAt: 1 });

      return SuccessHandler.handle200(
        "Messages fetched successfully",
        messages,
        res
      );
    } catch (err) {
      console.log("Error fetching messages", err);
      return ErrorHandler.handle500AndCustomError(err, res);
    }
  }

  async deleteMessages(req, res) {
    try {
      //TODO
      return SuccessHandler.handle200("Message deleted successfully", {}, res);
    } catch (err) {
      console.log("Error deleting messages", err);
      return ErrorHandler.handle500AndCustomError(err, res);
    }
  }
}

module.exports = new MessageController();
