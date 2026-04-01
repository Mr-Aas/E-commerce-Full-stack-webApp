import express from "express";
const router = express.Router();

import { getProducts, addProducts } from "../controllers/productcontroller.js";


import slides from "../data/addSlides/data.js";


// static routes
router.get('/slides', (req, res) => res.json(slides));


router.get("/items/:category", getProducts);
router.post("/items", addProducts);

export default router;