import { Request, Response } from "express";
import Conversation from "../models/conversation.model";
import cloudinary from "../lib/cloudinary";
import Message from "../models/message.model";

const messageTypes = ["text", "image", "file"] as const;

export const sendMessage = async (
  req: Request,
  res: Response,
): Promise<void> => {
  // Grab conversation id from params
  // Grab message form body
  // Validate conversation
  // Parse message type, if image then upload to cloudinary
  // "Send" message to conversation
  // Response with success or error
  try {
    const { messageType, content } = req.body;
    const userId = req.user!._id;
    const { conversationId } = req.params;

    if (!messageType || !content) {
      res.status(400).json({ message: "Content and message are required" });
      return;
    }

    if (!messageTypes.includes(messageType)) {
      res.status(400).json({ message: "Invalid message type" });
      return;
    }

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      res.status(400).json({ message: "Conversation not found" });
      return;
    }

    // TODO: Validate user is in conversation
    // if (!conversation.participants.includes(userId)) {
    //   res
    //     .status(403)
    //     .json({ message: "You are not a participant in this conversation" });
    //   return;
    // }

    let finalContent = content;

    if (messageType === "image") {
      try {
        const uploadApiResponse = await cloudinary.uploader.upload(content);
        finalContent = uploadApiResponse.secure_url;
      } catch (error) {
        console.error("Error uploading image to Cloudinary", error);
        res.status(500).json({ message: "Image upload failed" });
        return;
      }
    }

    const messageData = {
      conversation: conversationId,
      senderId: userId,
      messageType,
      content: finalContent,
    };

    const newMessage = new Message(messageData);
    const savedMessage = await newMessage.save();
    await savedMessage.populate("senderId", "username avatar");

    // TODO: Implment socket.io
    // emit message to socket.io

    res.status(200).json({
      sucess: true,
      message: "Message sent succesfully",
      data: savedMessage,
    });
  } catch (error) {
    console.error("Error in sendMessage controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
