import { model, Schema } from "mongoose";

const messageSchema = new Schema(
  {
    conversation: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    messageType: {
      type: String,
      enum: ["text", "image", "file"],
      required: true,
    },
    content: { type: String, required: true },
  },
  { timestamps: true },
);

const Message = model("Message", messageSchema);

export default Message;
