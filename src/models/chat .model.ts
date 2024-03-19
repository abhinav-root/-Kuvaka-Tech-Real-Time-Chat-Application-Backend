import { Schema, model } from "mongoose";

export interface IChat {
  name: string;
  isGroupChat: boolean;
  groupCreator: null;
  members: [];
}

const chatSchema = new Schema<IChat>(
  {
    name: {
      type: Schema.Types.String,
      default: null,
    },
    isGroupChat: {
      type: Schema.Types.Boolean,
      default: false,
    },
    groupCreator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Chat = model<IChat>("Chat", chatSchema);

export default Chat;
