import { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import User from "../models/user.model";

async function searchUsers(req: Request, res: Response) {
  try {
    const { q } = req.query;
    const users = await User.find({
      $or: [
        {
          firstName: { $regex: new RegExp(String(q), "i") },
        },
        {
          lastName: { $regex: new RegExp(String(q), "i") },
        },
      ],
    });
    const u = await User.find();
    console.log(u);
    return res.json(users);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
}

export { searchUsers };
