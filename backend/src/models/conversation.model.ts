import { model, Schema } from "mongoose";

const conversationSchema = new Schema(
  {
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
    // lastMessage: { type: Schema.Types.ObjectId, ref: "Message", default: null },
    isGroup: { type: Boolean, default: false },
    name: { type: String, default: "Party" },
  },
  { timestamps: true },
);

const Conversation = model("Conversation", conversationSchema);

export default Conversation;
