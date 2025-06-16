import mongoose, { model, Schema } from "mongoose";

const messageSchema = new Schema(
  {
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    textContent: { type: String },
    image: { type: String },
  },
  { timestamps: true },
);

const Message = model("Message", messageSchema);

export default Message;
