import express from "express";
import multer from "multer";
import cors from "cors";
import { uploadFile, downloadFile } from "../controllers/upload.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();
router.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Set saved storage options:
const upload = multer({ storage: storage });

router.post("/", upload.single("file"), uploadFile);
router.get("/:filename", downloadFile);

export default router;
