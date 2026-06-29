import express from "express";

import upload from "../middleware/uploadInvoice.js";

import { uploadInvoice } from "../controllers/invoiceController.js";

const router = express.Router();

router.post(

    "/upload",

    upload.single("invoice"),

    uploadInvoice

);

export default router;