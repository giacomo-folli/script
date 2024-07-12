import path from "path";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "../routes/auth.routes.js";
import messageRoutes from "../routes/message.routes.js";
import userRoutes from "../routes/user.routes.js";
import groupRoutes from "../routes/group.routes.js";
import uploadRoutes from "../routes/upload.routes.js";
import { app } from "../socket/socket.js";

const configServer = (dirname) => {
  dotenv.config();

  app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
  app.use(cookieParser());

  app.use("/api/auth", authRoutes);
  app.use("/api/messages", messageRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/groups", groupRoutes);
  app.use("/api/upload", uploadRoutes);

  app.use(express.static(path.join(dirname, "/public")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(dirname, "public", "index.html"));
  });

  return app;
};

export default configServer;
