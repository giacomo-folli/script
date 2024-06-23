import User from "../models/user.model.js";
import Chat from "../models/chat.model.js";

export const listUsers = async (req, res) => {
  try {
    const loggedInUser = req.user._id;

    const users = await User.find({ _id: { $ne: loggedInUser } }).select(
      "-password"
    );
    res.status(200).json(users);
  } catch (error) {
    console.log("Error in listUsers Controller:", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const listUserChats = async (req, res) => {
  try {
    const loggedInUser = req.user;
    if(!loggedInUser) throw new Error("No user logged in")

    // list of our contacts
    const users = [];
    for (let us of loggedInUser.contacts) {
      let contact = await User.findOne({ _id: us }).select("-password");
      if (contact) users.push(contact);
    }

    // search for existing chats with our contacts
    let chats = await Chat.find({
      participants: { $elemMatch: { $eq: loggedInUser._id } },
    }).populate("participants");

    res.status(200).json(chats);
  } catch (error) {
    console.log("Error in listUserChats :", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const addToContacts = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const { id: newContactId } = req.params;

    const user = await User.findOne({ _id: loggedInUser });
    if (!user) throw new Error("Cannot find currently logged in user");

    const contact = await User.findOne({ _id: newContactId });
    if (!contact) throw new Error("Cannot new contact in db");

    // check if new contact already present
    if (!user.contacts.includes(newContactId)) {
      // add contact
      user.contacts.push(newContactId);
      await user.save();
    }

    // check if we are in other user contacts
    if (!contact.contacts.includes(loggedInUser._id)) {
      // add contact
      contact.contacts.push(loggedInUser._id);
      await contact.save();
    }

    const newChat = new Chat({
      participants: [loggedInUser._id, contact._id],
    });
    await newChat.save();

    res.status(200).json(user);
  } catch (error) {
    console.log("Error in addContact Controller:", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
