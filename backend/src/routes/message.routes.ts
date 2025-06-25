import express from "express";
import { deleteMessage, sendMessage } from "../controllers/message.controller";
import { protectedRoute } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/:conversationId/send", protectedRoute, sendMessage);
router.delete("/:messageId/delete", protectedRoute, deleteMessage);

export default router;
