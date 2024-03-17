import { Schema, model } from "mongoose";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profileImageUrl: string;
  friends: [];
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
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ firstName: 1 });
userSchema.index({ lastName: 1 });
userSchema.index({ firstName: 1, lastName: 1 });

const User = model<IUser>("User", userSchema);

export default User;
