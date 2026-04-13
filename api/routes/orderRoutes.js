// routes/orderRoutes.js
import express from "express";
import { createOrder, getSales, getOrders, markAsDelivered, cancelOrder,getMyOrders } from "../controllers/orderController.js";
import authMiddleware from "../middleware/AuthMiddleware.js";


const router = express.Router();

router.post("/", authMiddleware, createOrder);
router.get("/sales", getSales)
router.get("/", getOrders)
router.put("/:id/deliver", markAsDelivered)
router.put("/cancel", cancelOrder)
router.get("/my-orders", authMiddleware, getMyOrders);
export default router;

// ("/orders/${id}/deliver