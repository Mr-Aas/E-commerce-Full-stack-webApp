import express from "express";
const router = express.Router();

import { getCategories, addCategory, addSubCategory } from "../controllers/categoriescontroller.js";



router.get("/", getCategories);
router.post("/", addCategory)
router.post("/:categoryId/subcategory", addSubCategory)
// setForm({
//                 categoryId: "",
//                 subcategory: "",
//                 subcategoryType: "",
//                 subCategoryImages: "",
//                 subcategoryDescription: ""
//             });
export default router;