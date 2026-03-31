import express from "express";
const router = express.Router();

import { getProducts, addProducts } from "../controllers/productcontroller.js";

import grocery from "../data/grocery/data.js";
import slides from "../data/addSlides/data.js";
import hardware from '../data/hardware/data.js'

// static routes
router.get('/slides', (req, res) => res.json(slides));
router.get('/grocery', (req, res) => res.json(grocery));
router.get('/hardware', (req, res) => res.json(hardware));

// DB routes
router.get("/products", getProducts);
router.post("/products", addProducts);

export default router;