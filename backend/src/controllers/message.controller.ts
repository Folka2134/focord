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

    const conversation = await Conversation.findOne({
      _id: conversationId,
      participants: userId,
    });
    if (!conversation) {
      res
        .status(400)
        .json({ message: "Conversation not found or unauthorized" });
      return;
    }

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
    await savedMessage.populate("senderId", "userName avatarUrl");

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

export const deleteMessage = async (
  req: Request,
  res: Response,
): Promise<void> => {
  // Grab message id from params
  // Validate message
  // delete message from database
  // response
  try {
    const { messageId } = req.params;
    const userId = req.user!._id;

    const deletedMessage = await Message.findOneAndDelete({
      _id: messageId,
      senderId: userId,
    });

    if (!deletedMessage) {
      res.status(404).json({ message: "Message not found or unauthorized" });
      return;
    }

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error in deleteMessage controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const editMessage = async (
  req: Request,
  res: Response,
): Promise<void> => {
  // Grab message id from params
  // Validate message
  // Update message
  // response
  try {
    const { messageId } = req.params;
    const userId = req.user!._id;
    const { content } = req.body;

    if (!content) {
      res.status(400).json({ message: "Content is required" });
      return;
    }

    const message = await Message.findOne({
      _id: messageId,
      senderId: userId,
    });
    if (!message) {
      res.status(404).json({ message: "Message not found or unauthorized" });
      return;
    }

    if (message.messageType != "text") {
      res.status(400).json({ message: "Only text messages can be edited" });
      return;
    }

    const updatedMessage = await Message.findByIdAndUpdate(
      messageId,
      {
        content: content,
      },
      {
        new: true,
      },
    ).populate("senderId", "username avatar");

    res
      .status(200)
      .json({ message: "Message updated successfully", data: updatedMessage });
  } catch (error) {
    console.error("Error in updateMessage controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
