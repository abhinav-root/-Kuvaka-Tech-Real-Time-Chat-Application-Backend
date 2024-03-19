import { Request, Response } from "express";
import User, { IUser } from "../models/user.model";
import { StatusCodes } from "http-status-codes";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Document } from "mongoose";

// Signup
async function signup(req: Request, res: Response) {
  try {
    const { firstName, lastName, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: "This email is already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await user.save();
    const accessToken = getAccessToken({ id: user.id });
    return res.status(StatusCodes.CREATED).json({ accessToken });
  } catch (err) {
    console.log(err);
  }
}

// Login
async function login(req: Request, res: Response) {
  try {
    const user = req.user as Document<IUser>;
    console.log({ user });
    const accessToken = getAccessToken({ id: user.id });
    return res.status(StatusCodes.OK).json({ accessToken });
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

export { signup, login };
