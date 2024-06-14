import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import cookieParser from "cookie-parser";
import connectToDb from "./db/connect.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

app.use(express.json()); // to parse requests with JSON payloads
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

// app.get("/", (req, res) => {
//   // root route
//   res.send("Hello world!");
// });

server.listen(PORT, () => {
  // connect to mongodb
  connectToDb();

  console.log(`server is running on port ${PORT}`);
});
