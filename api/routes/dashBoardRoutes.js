import express from "express";
const router = express.Router();
import authMiddleware from "../middleware/AuthMiddleware.js";
import isAdmin from "../middleware/isAdmin.js";
import { getAllProducts, getAllSales, getAllUsers } from "../controllers/adminDashboardController.js";





import slides from "../data/addSlides/data.js";



router.get("/products", authMiddleware, isAdmin, getAllProducts);
router.get("/sales", authMiddleware, isAdmin, getAllSales);
router.get("/users", authMiddleware, isAdmin, getAllUsers);



// router.post("/items", addProducts);

export default router;