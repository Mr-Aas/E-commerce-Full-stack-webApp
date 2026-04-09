import express from "express";
import multer from "multer";
import { uploadImage } from "../controllers/uploadController.js";

const router = express.Router();


const storage = multer.memoryStorage(); // ✅ MUST BE THIS
const upload = multer({ storage });

router.post("/", upload.single("image"), uploadImage);

export default router;