import express from "express";
const router = express.Router();

import { getCategories, addCategories } from "../controllers/categoriescontroller.js";

 

router.get("/categories", getCategories);
router.post("/categories", addCategories);

export default router;