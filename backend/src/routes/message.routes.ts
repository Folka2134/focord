import express from "express";
import { sendMessage } from "../controllers/message.controller";
import { protectedRoute } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/:conversationId/send", protectedRoute, sendMessage);

export default router;
