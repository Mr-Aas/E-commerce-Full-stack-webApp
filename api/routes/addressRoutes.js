// routes/addressRoutes.js
import express from "express";
import { addAddress, getAddresses, deletaAddress, editaddress, getaddressbyId } from "../controllers/addressController.js";
import authMiddleware from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, addAddress);
router.get("/", authMiddleware, getAddresses);
// routes/addressRoutes.js

router.delete("/:id", authMiddleware, deletaAddress)
router.put("/:id", authMiddleware, editaddress);
router.get("/:id", authMiddleware, getaddressbyId);

export default router;