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
router.get("/:id", protectedRoute, getConversationMessages);
router.post("/create", protectedRoute, createConversation);
router.put("/:id/add", protectedRoute, addParticipants);
router.put("/:id/leave", protectedRoute, leaveConversation);
router.put("/:id/update-name", protectedRoute, updateName);

export default router;
