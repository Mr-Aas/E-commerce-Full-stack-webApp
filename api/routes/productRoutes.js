import express from "express";
const router = express.Router();

import authMiddleware from "../middleware/AuthMiddleware.js";
import isAdmin from "../middleware/isAdmin.js";

import {
    getProducts,
    addProducts,
    getProductById,
    deleteProduct,
    updateProduct,
    searchProducts
} from "../controllers/productcontroller.js";

import slides from "../data/addSlides/data.js";

// STATIC
// router.get("/slides", (req, res) => res.json(slides));
router.get("/search", searchProducts);

// PRODUCTS
router.get("/items/:category", getProducts);
router.post("/addproduct", authMiddleware, isAdmin, addProducts);

// CRUD (IMPORTANT CHANGE)
router.get("/:id", getProductById);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);
router.put("/:id", authMiddleware, isAdmin, updateProduct);

export default router;