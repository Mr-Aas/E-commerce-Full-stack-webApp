// routes/orderRoutes.js
import express from "express";
import { createOrder, getSales, getOrders, markAsDelivered, cancelOrder, getMyOrders } from "../controllers/orderController.js";
import authMiddleware from "../middleware/AuthMiddleware.js";
import rateLimit from "express-rate-limit";
import isAdmin from "../middleware/isAdmin.js";

const orderlimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 100 requests
    message: "Too many requests, try again later"
});


const router = express.Router();

router.post("/", authMiddleware, orderlimiter, createOrder);
router.get("/sales", authMiddleware, isAdmin, getSales)
router.get("/", authMiddleware, isAdmin, getOrders)
router.put("/:id/deliver", authMiddleware, isAdmin, markAsDelivered)
router.put("/cancel", authMiddleware, orderlimiter, cancelOrder)
router.get("/my-orders", authMiddleware, orderlimiter, getMyOrders);
export default router;

// ("/orders/${id}/deliver