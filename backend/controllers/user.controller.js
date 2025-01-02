import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const currentUserId = req.auth.userId;
    // console.log("Current ID:", currentUserId);
    const users = await User.find({ clerkId: { $ne: currentUserId } });
    // console.log("Found users:", users);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const myId = req.auth.userId;
    const { userId } = req.params;

    const message = await Message.find({
      $or: [
        { senderId: userId, receiverId: myId },
        { senderId: myId, receiverId: userId },
      ],
    }).sort({ createAt: 1 });

    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};
