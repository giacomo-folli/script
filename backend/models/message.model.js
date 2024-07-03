import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: false,
    },
    isFile: {
      type: Boolean,
      required: false,
      default: false,
    },
    type: {
      type: String,
      required: false
    },
    fileName: {
      type: String,
      required: false,
    },
    message: {
      type: String,
      required: false,
    },
    opened: {
      type: Boolean,
      required: false,
      default: false,
    },
    // createdAt, updatedAt
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
