// routes/cartRoutes.js
import express from "express";
import { addToCart } from "../controllers/cartController.js";
import authMiddleware from "../middleware/AuthMiddleware.js";
import rateLimit from "express-rate-limit";
const cartlimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 100 requests
    message: "Too many requests, try again later"
});

const router = express.Router();

router.post("/add", authMiddleware, cartlimiter, addToCart);

export default router;