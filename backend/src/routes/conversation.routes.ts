import express from "express";
import {
  addParticipants,
  createConversation,
  getAllConversations,
  getConversationMessages,
  leaveConversation,
  updateName,
} from "../controllers/conversation.controller";
import { protectedRoute } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", protectedRoute, getAllConversations);
router.get("/:conversationId", protectedRoute, getConversationMessages);
router.post("/create", protectedRoute, createConversation);
router.put("/:conversationId/add", protectedRoute, addParticipants);
router.put("/:conversationId/leave", protectedRoute, leaveConversation);
router.put("/:conversationId/update-name", protectedRoute, updateName);

export default router;
