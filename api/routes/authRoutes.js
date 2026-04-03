import express from "express"
const router = express.Router()
import authMiddleware from "../middleware/AuthMiddleware.js"
import { signupUser, loginUser,getUserProfile } from "../controllers/AuthController.js"

router.post("/login", loginUser)
router.post("/signup", signupUser)
router.get("/profile",authMiddleware, getUserProfile)

export default router
