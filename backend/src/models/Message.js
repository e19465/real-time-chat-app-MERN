const mongoose = require("mongoose");
const { ModalNames } = require("../constants/common");

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: ModalNames.USER,
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: ModalNames.USER,
      required: true,
    },
    text: {
      type: String,
      default: "",
    },
    files: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
