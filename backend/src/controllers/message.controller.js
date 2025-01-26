const ErrorHandler = require("../helpers/ErrorHandler");
const SuccessHandler = require("../helpers/SuccessHandler");
const Message = require("../models/Message");
const FileService = require("../services/FileService");
const User = require("../models/User");

class MessageController {
  //! create message
  async createMessage(req, res) {
    try {
      // obtain the current user id and the user to chat user id from the request, check if they exist
      const myUserId = req.user.userId;
      const userToChatUserId = req.params.userToChatUserId;
      if (!myUserId) {
        return ErrorHandler.handle400("Current user id is required", res);
      }
      if (!userToChatUserId) {
        return ErrorHandler.handle400("User to chat user id is required", res);
      }

      // obtain the text and images from the request body, upload the images to the cloud storage and get their URLs
      const text = req.body.text;
      const fileUrls = await FileService.uploadFilesAndGiveUrls(
        req,
        `messages/${myUserId.toString()}`,
        false
      );

      // check if the text or images exist, if not, return an error
      if (!text && fileUrls.length === 0) {
        return ErrorHandler.handle400("Text or image is required", res);
      }

      // create a new message with the sender id, receiver id, text and images
      const newMessage = new Message({
        senderId: myUserId,
        receiverId: userToChatUserId,
        text: text,
        files: fileUrls,
      });

      // save the message to the database
      const savedMessage = await newMessage.save();

      //TODO: real time functionality with socket.io

      // return a success response with the saved message
      return SuccessHandler.handle201(
        "Message created successfully",
        savedMessage,
        res
      );
    } catch (err) {
      console.log("Error creating message", err);
      return ErrorHandler.handle500AndCustomError(err, res);
    }
  }

  //! get conversation messages
  async getMessages(req, res) {
    try {
      // obtain the current user id and the user to chat user id from the request, check if they exist
      const myUserId = req.user.userId;
      const userToChatUserId = req.params.userToChatUserId;
      if (!myUserId) {
        return ErrorHandler.handle400("Current user id is required", res);
      }
      if (!userToChatUserId) {
        return ErrorHandler.handle400("User to chat user id is required", res);
      }

      // find all messages where the sender id is the current user id and the receiver id is the user to chat user id, sort them by createdAt in ascending order
      const messages = await Message.find({
        $or: [
          { senderId: myUserId, receiverId: userToChatUserId },
          { senderId: userToChatUserId, receiverId: myUserId },
        ],
      }).sort({ createdAt: 1 });

      // return a success response with the messages
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
      // obtain the current user id and the user to chat user id from the request, check if they exist
      const myUserId = req.user.userId;
      const userToChatUserId = req.params.userToChatUserId;
      const messageIds = JSON.parse(req.params.messageIds);

      if (!myUserId) {
        return ErrorHandler.handle400("Current user id is required", res);
      }
      if (!userToChatUserId) {
        return ErrorHandler.handle400("User to chat user id is required", res);
      }

      // check messageIds are array or not, if array then lenght should be greater than 0
      if (
        !messageIds ||
        !Array.isArray(messageIds) ||
        messageIds.length === 0
      ) {
        return ErrorHandler.handle400("Message ids are required", res);
      }

      // delete messages where the sender id is the current user id and the receiver id is the user to chat user id and the message id is in the messageIds array

      const foundMessages = await Message.find({
        senderId: myUserId,
        receiverId: userToChatUserId,
        _id: { $in: messageIds },
      });

      const deletedResponse = await Message.deleteMany({
        senderId: myUserId,
        receiverId: userToChatUserId,
        _id: { $in: messageIds },
      });

      if (deletedResponse.deletedCount === 0) {
        return ErrorHandler.handle404("Messages not found", res);
      }

      // delete the images of the deleted messages from the cloud storage
      let imagesToDelete = [];
      for (const message of foundMessages) {
        if (message.images && message.images.length > 0) {
          imagesToDelete = imagesToDelete.concat(message.images);
        }
      }
      const deletedImages = await FileService.deleteFilesByUrls(imagesToDelete);

      // return a success response with the deleted messages and images
      return SuccessHandler.handle200(
        "Messages deleted successfully",
        {
          deletedImages: deletedImages,
        },
        res
      );
    } catch (err) {
      console.log("Error deleting messages", err);
      return ErrorHandler.handle500AndCustomError(err, res);
    }
  }
}

module.exports = new MessageController();
