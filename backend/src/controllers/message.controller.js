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
      return ErrorHandler.handle500AndCustomError(err, res);
    }
  }

  async getMessages(req, res) {
    try {
      //TODO
      return SuccessHandler.handle200("Messages fetched successfully", {}, res);
    } catch (err) {
      return ErrorHandler.handle500AndCustomError(err, res);
    }
  }

  async deleteMessages(req, res) {
    try {
      //TODO
      return SuccessHandler.handle200("Message deleted successfully", {}, res);
    } catch (err) {
      return ErrorHandler.handle500AndCustomError(err, res);
    }
  }
}

module.exports = new MessageController();
