import { Schema, model } from "mongoose";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profileImageUrl: string;
}

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: Schema.Types.String,
      required: true,
      trim: true,
      lowercase: true,
    },
    lastName: {
      type: Schema.Types.String,
      required: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: Schema.Types.String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: { type: Schema.Types.String, required: true },
    profileImageUrl: { type: Schema.Types.String, default: null },
  },
  { timestamps: true }
);

const User = model<IUser>("User", userSchema);

export default User;
