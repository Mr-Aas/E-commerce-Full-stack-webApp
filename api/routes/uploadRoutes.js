import express from "express";
import multer from "multer";
import { uploadImage } from "../controllers/uploadController.js";
import isAdmin from "../middleware/isAdmin.js";
import authMiddleware from "../middleware/AuthMiddleware.js";

const router = express.Router();


const storage = multer.memoryStorage(); // ✅ MUST BE THIS
const upload = multer({ storage });

router.post("/", authMiddleware, isAdmin, upload.single("image"), uploadImage);

export default router;