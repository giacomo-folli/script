import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { listUsers } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, listUsers);

export default router;
