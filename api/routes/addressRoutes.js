// routes/addressRoutes.js
import express from "express";
import { addAddress, getAddresses, deletaAddress, editaddress, getaddressbyId } from "../controllers/addressController.js";
import authMiddleware from "../middleware/AuthMiddleware.js";
import rateLimit from "express-rate-limit";

const router = express.Router();
const addresslimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 100 requests
    message: "Too many requests, try again later"
});



router.post("/", authMiddleware, addresslimiter, addAddress);
router.get("/", authMiddleware, addresslimiter, getAddresses);
// routes/addressRoutes.js

router.delete("/:id", authMiddleware, addresslimiter, deletaAddress)
router.put("/:id", authMiddleware, addresslimiter, editaddress);
router.get("/:id", authMiddleware, addresslimiter, getaddressbyId);

export default router;