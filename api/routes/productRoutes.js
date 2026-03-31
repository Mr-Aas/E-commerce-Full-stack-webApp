import express from "express";
const router = express.Router();

import { getProducts, addProducts } from "../controllers/productcontroller.js";


import slides from "../data/addSlides/data.js";


// static routes
router.get('/slides', (req, res) => res.json(slides));


router.get("/products", getProducts);
router.post("/products", addProducts);

export default router;