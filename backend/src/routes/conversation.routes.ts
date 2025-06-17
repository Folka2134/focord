import express from "express";
import {
  getAllConversations,
  getConversationMessages,
} from "../controllers/conversation.controller";
import { protectedRoute } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", protectedRoute, getAllConversations);
router.get("/:id", protectedRoute, getConversationMessages);

export default router;
