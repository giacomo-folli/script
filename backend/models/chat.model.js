import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
    isGroup: {
      type: Boolean,
      required: false,
      default: false,
    },
    groupName: {
      type: String,
      required: false,
      default: "#private_chat",
    },
    groupImage: {
      type: String,
      required: false,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

/**
 * @param {Array} participants
 * @param {Array} messages
 * @param {boolean} isGroup
 * @param {string} groupName
 * @param {string} groupImage
 * @param {Object} admin
 */
const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
