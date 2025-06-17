import { model, Schema } from "mongoose";

const messageSchema = new Schema(
  {
    conversation: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    textContent: { type: String },
    image: { type: String },
  },
  { timestamps: true },
);

const Message = model("Message", messageSchema);

export default Message;
