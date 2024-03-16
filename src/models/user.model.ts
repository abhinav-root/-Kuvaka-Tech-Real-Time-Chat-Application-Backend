import { Schema, model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  profileImageUrl: string;
}

const userSchema = new Schema<IUser>(
  {
    name: {
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
