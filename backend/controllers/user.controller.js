import User from "../models/user.model.js";

export const listUsers = async (req, res) => {
  try {
    const loggedInUser = req.user._id;

    const users = await User.find({ _id: { $ne: loggedInUser } });
    res.status(201).json(users);
  } catch (error) {
    console.log("Error in listUsers Controller:", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
