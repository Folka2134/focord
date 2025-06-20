import express from "express";
import {
  addParticipants,
  createConversation,
  getAllConversations,
  getConversationMessages,
  leaveConversation,
} from "../controllers/conversation.controller";
import { protectedRoute } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", protectedRoute, getAllConversations);
router.get("/:id", protectedRoute, getConversationMessages);
router.post("/create", protectedRoute, createConversation);
router.put("/:id/add", protectedRoute, addParticipants);
router.put("/:id/leave", protectedRoute, leaveConversation);

export default router;
