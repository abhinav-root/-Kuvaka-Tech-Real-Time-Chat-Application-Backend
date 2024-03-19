import { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import User, { IUser } from "../models/user.model";
import { Document } from "mongoose";

async function searchUsers(req: Request, res: Response) {
  try {
    const { q } = req.query;
    const user = req.user as Document<IUser>;
    const users = await User.find({
      $or: [
        {
          firstName: { $regex: new RegExp(String(q), "i") },
        },
        {
          lastName: { $regex: new RegExp(String(q), "i") },
        },
      ],
      _id: { $ne: user?._id },
    });
    return res.json(users);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
}

async function getAllFriends(req: Request, res: Response) {
  try {
    const user = req.user as Document<IUser>;
    const result = await User.findById(user.id).populate("friends");
    return res.json(result?.friends);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
}

async function addFriend(req: Request, res: Response) {
  try {
    const { _id } = req.user as Document<IUser>;
    const { friendId } = req.body;
    const friend = await User.findById(friendId).select("-password");
    if (!friend) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No user found with given friendId" });
    }
    const user = await User.findById(_id);
    if (
      user?.friends.includes(friendId as never) ||
      friend.friends.includes(_id as never)
    ) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: "This user is already a friend" });
    }

    user?.friends.push(friend.id as never);
    friend.friends.push(user?.id as never);

    await user?.save();
    await friend.save();

    console.log({ user, friend });
    return res
      .status(StatusCodes.CREATED)
      .json({ friend, message: "Friend addded successfully" });
  } catch (err) {
    console.log(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
}

async function removeFriend(req: Request, res: Response) {
  try {
    const { _id } = req.user as Document<IUser>;
    const { friendId } = req.params;
    const friend = await User.findById(friendId).select("-password");
    if (!friend) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No user found with given friendId" });
    }
    const user = await User.findById(_id);

    await user?.updateOne({ $pull: { friends: { $in: [friendId] } } });
    await friend?.updateOne({ $pull: { friends: { $in: [_id] } } });
    return res
      .status(StatusCodes.CREATED)
      .json({ friend, message: "Friend removed successfully" });
  } catch (err) {
    console.log(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
}

export { searchUsers, getAllFriends, addFriend, removeFriend };
