import { Request, Response } from "express";
import User from "../models/user.model";
import { StatusCodes } from "http-status-codes";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function signup(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: "This email is already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    const accessToken = getAccessToken({ id: user.id });
    return res.status(StatusCodes.CREATED).json({ accessToken });
  } catch (err) {
    console.log(err);
  }
}

function getAccessToken(payload: any): string {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}

export { signup };
