import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const createChatGroup = async (req, res) => {
  try {
    const loggedInUser = req.user;
    const { participants } = req.body;

    if (!participants || participants.length == 0)
      throw new Error("No participants supplied");

    const res_adj = await fetch(
      "https://random-word-form.herokuapp.com/random/adjective"
    );
    const ADJECTIVE = await res_adj.json();
    const NOUN = "cats";
    const GROUP_NAME = ADJECTIVE[0] + " " + NOUN;

    const newGroup = new Chat({
      admin: loggedInUser._id,
      isGroup: true,
      groupImage:
        "https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Mittens",
      groupName: GROUP_NAME,
      participants: [...participants, loggedInUser._id],
    });

    await newGroup.save();
    if (!newGroup) throw new Error("Could not create a new group");

    const otherUsers = newGroup.participants.filter(
      (p) => p._id.toString() != loggedInUser._id.toString()
    );
    console.log("participants", otherUsers);

    if (Array.isArray(otherUsers) && otherUsers.length > 0)
      for (let user of otherUsers) {
        let receiverSocketId = getReceiverSocketId(user._id);
        console.log(receiverSocketId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("newGroup", newGroup);
        }
      }

    res.status(200).json(newGroup);
  } catch (error) {
    console.log("Error in createGroup Controller:", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const leaveChatGroup = async (req, res) => {
  try {
    const loggedInUser = req.user;
    const { id: chatGroupId } = req.params;

    const group = await Chat.findOne({ _id: chatGroupId });
    if (!group) throw new Error("Could not find the group");

    // non sono sicuro di questo procedimento
    if (loggedInUser._id === group.admin._id) {
      group.admin =
        loggedInUser._id !== group.participants[0]._id ??
        (group.participants[0] || null);
    }

    const checkParticipants = group.participants.length;
    group.participants = group.participants.filter(
      (pr) => pr._id.toString() !== loggedInUser._id.toString()
    );

    await group.save();
    if (checkParticipants == group.participants.length)
      throw new Error("Could not leave the group");

    res.status(200).json({ message: "ok" });
  } catch (error) {
    console.log("Error in leaveChatGroup Controller:", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const deleteGroup = async (req, res) => {
  const loggedInUser = req.user;
  const { id: chatGroupId } = req.params;

  try {
    const group = await Chat.findOne({ _id: chatGroupId });
    if (!group) throw new Error("Could not find the group ");

    if (group.admin.toString() != loggedInUser._id.toString())
      throw new Error("You can't delete this group");

    await Message.deleteMany({ chatId: group._id });
    await Chat.findOneAndDelete({ _id: group._id });

    res.status(200).json({ message: "ok" });
  } catch (error) {
    console.log("Error in deleteGroup Controller:", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

// export const addUserToGroup = async (req, res) => {
//   try {
//     const { id: chatId } = req.params;
//     const userId = req.user._id;

//     let chat = await Chat.findOne({ _id: chatId });
//     if (!chat) return res.status(500).json({ error: "chat not found" });

//     // add check if user already present in group

//     chat.participants.push(userId);

//     await chat.save();

//     // const receiverSocketId = getReceiverSocketId(receiverId);
//     // if (receiverSocketId) {
//     //   io.to(receiverSocketId).emit("newMessage", newMessage);
//     // }

//     res.status(201).json(chat);
//   } catch (error) {
//     console.log("Error in AddToConversation Controller:", error.message);
//     res.status(500).json({ error: "internal server error" });
//   }
// };
