import express from "express"
const router = express.Router()
import authMiddleware from "../middleware/AuthMiddleware.js"
import { signupUser, loginUser, getUserProfile } from "../controllers/AuthController.js"
import rateLimit from "express-rate-limit"


const authlimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 100 requests
    message: "Too many requests, try again later"
});


router.post("/login", authlimiter, loginUser)
router.post("/signup", authlimiter, signupUser)
router.get("/profile", authMiddleware, authlimiter, getUserProfile)

export default router
