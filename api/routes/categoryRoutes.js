import express from "express";
const router = express.Router();

import { getCategories, addCategories } from "../controllers/categoriescontroller.js";



router.get("/", getCategories);
router.post("/addcategory", addCategories)

export default router;