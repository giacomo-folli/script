import Chat from "../models/chat.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import Message from "../models/message.model.js";

export const createMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: chatId } = req.params;
    const senderId = req.user._id;

    if (!message) throw new Error("No message body");
    if (!chatId) throw new Error("No chat id provided");

    let chat = await Chat.findOne({
      _id: chatId,
    });

    if (!chat) throw new Error("No chat found");

    const newMessage = new Message({
      senderId,
      chatId,
      message,
    });
    await newMessage.save();
    if (!newMessage) throw new Error("Could not create a new message");

    chat.messages.push(newMessage._id);
    await chat.save();

    for (let users of chat.participants) {
      let receiverSocketId = getReceiverSocketId(users._id);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in createMessage Controller:", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: chatId } = req.params;
    const senderId = req.user._id;

    const chat = await Chat.findOne({
      _id: chatId,
    }).populate("messages");

    if (!chat) throw new Error("Could not find the chat");
    if (!chat.messages) return res.status(200).json([]);

    res.status(200).json(chat.messages);
  } catch (error) {
    console.log("Error in getMessage Controller:", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
