import { Request, Response } from "express";
import Conversation from "../models/conversation.model";
import Message from "../models/message.model";
import User from "../models/user.model";

export const getAllConversations = async (
  req: Request,
  res: Response,
): Promise<void> => {
  // Get currentUser
  // Get all conversations that include currentUser
  try {
    const currentUserId = req.user!._id;
    const userConversations = await Conversation.find({
      participants: currentUserId,
    });

    res.status(200).json(userConversations);
  } catch (error) {
    console.error("Error in getAllConversations controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getConversationMessages = async (
  req: Request,
  res: Response,
): Promise<void> => {
  // Get conversation id from params
  // Find all messages from current conversation
  try {
    const { conversationId } = req.params;
    const conversationMessages = await Message.find({
      conversation: conversationId,
    })
      .populate("senderId", "userName avatarUrl")
      .populate("receiverId", "userName avatarUrl")
      .sort({ createdAt: 1 });

    res.status(200).json(conversationMessages);
  } catch (error) {
    console.error("Error in getConversationMessages controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createConversation = async (
  req: Request,
  res: Response,
): Promise<void> => {
  // Grab currentUser from req
  // Grab participants from req.body (add to set)
  // Remove duplicates from participants
  // Add currentUser to participants
  // Check that user has permission to message participants ****
  // If messaging individual check if conversation already exists
  // Create conversation using data
  //    Set isGroup flag if participants > 2
  //    set group name to participants names
  // Save to mongodb

  try {
    const { participants, name, isGroup } = req.body;
    const currentUser = req.user;

    if (!participants || participants.length === 0) {
      res.status(400).json({ message: "Participants are required" });
      return;
    }

    const validParticipants = await User.find({ _id: { $in: participants } });
    const validParticipantIds = validParticipants.map((participant) =>
      participant._id.toString(),
    );
    const invalidParticipantIds = participants.filter(
      (id: string) => !validParticipantIds.includes(id),
    );

    const allParticipants = [
      ...new Set([...validParticipantIds, currentUser?._id]),
    ];

    if (allParticipants.length === 2) {
      const existingConversation = await Conversation.findOne({
        participants: { $all: allParticipants, $size: 2 },
      }).populate("participants", "userName avatarUrl");

      if (existingConversation) {
        const response = { conversation: existingConversation };
        res.status(200).json(response);
        return;
      }
    }

    const conversationData = {
      participants: allParticipants,
      isGroup: isGroup || allParticipants.length > 2,
      ...(name && { name }),
    };

    const conversation = await Conversation.create(conversationData);

    const populatedConversation = await conversation.populate(
      "participants",
      "userName avatarUrl",
    );

    const response = {
      conversation: populatedConversation,
      ...(invalidParticipantIds.length > 0 && {
        warnings: [
          `${invalidParticipantIds.length} participants could not be found`,
        ],
        invalidParticipants: invalidParticipantIds,
      }),
    };

    res.status(201).json(response);
  } catch (error) {
    console.error("Error in createConversation controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addParticipants = async (req: Request, res: Response) => {
  try {
    const { participants } = req.body;
    const { conversationId } = req.params;

    if (!participants || participants.length === 0) {
      res.status(400).json({ message: "Select atleast 1 participant" });
      return;
    }

    const validParticipants = await User.find({ _id: { $in: participants } });
    if (validParticipants.length !== participants.length) {
      res.status(400).json({ message: "Some participants are invalid users" });
      return;
    }
    const validParticipantIds = validParticipants.map((participant) =>
      participant._id.toString(),
    );

    const conversation = await Conversation.findOne({ conversationId });
    if (!conversation) {
      res.status(400).json({ message: "Conversation not found" });
      return;
    }

    const existingParticipants = conversation.participants.map((participant) =>
      participant.toString(),
    );

    const newParticipants = validParticipantIds.filter((participant: any) => {
      return !existingParticipants.includes(participant.toString());
    });

    if (!newParticipants || newParticipants.length == 0) {
      res.status(400).json({ message: "Select atleast 1 new participant" });
      return;
    }

    const allParticipants = [
      ...new Set([...existingParticipants, ...newParticipants]),
    ];

    const updatedConversation = await Conversation.findOneAndUpdate(
      { conversationId },
      { participants: allParticipants },
      { new: true },
    );

    res.status(200).json({
      message: "Participants added successfully",
      conversation: updatedConversation,
      addedParticipants: newParticipants,
    });
  } catch (error) {
    console.error("Error in addParticipants controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const leaveConversation = async (
  req: Request,
  res: Response,
): Promise<void> => {
  // Validate user
  // Validate conversation
  // Remove user from conversation participants
  // Update conversation
  try {
    const { conversationId } = req.params;
    const userId = req.user!._id;

    const conversation = await Conversation.findOne({ conversationId });
    if (!conversation) {
      res.status(404).json({ message: "Conversation not found" });
      return;
    }

    const existingParticipants = conversation.participants.map((participant) =>
      participant.toString(),
    );
    const updatedParticipants = existingParticipants.filter((id) => {
      return id != userId;
    });

    const updatedConversation = await Conversation.findOneAndUpdate(
      { conversationId },
      { participants: updatedParticipants },
      { new: true },
    );

    res.status(200).json({
      message: "Participant left the conversation",
      conversation: updatedConversation,
    });
  } catch (error) {
    console.error("Error in leaveConversation controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
