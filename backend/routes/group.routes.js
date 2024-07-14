import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  createChatGroup,
  leaveChatGroup,
  deleteGroup,
} from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/create", protectRoute, createChatGroup);
router.get("/leave/:id", protectRoute, leaveChatGroup);
router.get("/delete/:id", protectRoute, deleteGroup);

export default router;
