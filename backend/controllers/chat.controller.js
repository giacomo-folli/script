import Chat from "../models/chat.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: chatId } = req.params;
    const senderId = req.user._id;

    let chat = await Chat.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    await newMessage.save();

    // const receiverSocketId = getReceiverSocketId(receiverId);
    // if (receiverSocketId) {
    //   io.to(receiverSocketId).emit("newMessage", newMessage);
    // }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage Controller:", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const chat = await Chat.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!chat) return res.status(200).json([]);

    const messages = chat.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessage Controller:", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const addUserToGroup = async (req, res) => {
  try {
    const { id: chatId } = req.params;
    const userId = req.user._id;

    let chat = await Chat.findOne({ _id: chatId });
    if (!chat) return res.status(500).json({ error: "chat not found" });

    // add check if user already present in group

    chat.participants.push(userId);

    await chat.save();

    // const receiverSocketId = getReceiverSocketId(receiverId);
    // if (receiverSocketId) {
    //   io.to(receiverSocketId).emit("newMessage", newMessage);
    // }

    res.status(201).json(chat);
  } catch (error) {
    console.log("Error in AddToConversation Controller:", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

// export const removeUserFromGroup = async (req, res) => {
//   try {
//     const { targetId } = req.body;
//     const { id: groupId } = req.params;
//     const actorId = req.user._id;

//     let group = await Group.findOne({ _id: groupId });
//     if (!group) return res.status(500).json({ error: "Group not found" });
//     const lengthBefore = group.participants.length;

//     if (actorId.toString() !== group.createdBy.toString())
//       return res.status(500).json({ error: "Action not permitted" });

//     let user = await User.findOne({ _id: targetId });
//     if (!user) return res.status(500).json({ error: "Group not found" });

//     const targetIndex = group.participants.indexOf(user._id);

//     if (targetIndex !== -1) group.participants.splice(targetIndex, 1);
//     else return res.status(500).json({ error: "No user found in group" });

//     await group.save();

//     // const receiverSocketId = getReceiverSocketId(receiverId);
//     // if (receiverSocketId) {
//     //   io.to(receiverSocketId).emit("newMessage", newMessage);
//     // }

//     if (group.participants.length >= lengthBefore)
//       return res
//         .status(500)
//         .json({ error: "Something went wrong in deleting the user" });

//     res.status(201).json(group);
//   } catch (error) {
//     console.log("Error in sendMessage Controller:", error.message);
//     res.status(500).json({ error: "internal server error" });
//   }
// };
