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

export { searchUsers, getAllFriends };
