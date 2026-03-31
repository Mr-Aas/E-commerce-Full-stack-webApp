import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    id: String,
    name: String,
    price: Number,
    category: String,
    subcategory: String,
    brand: String,
    unitsAvailable: Number,
    images: [String, String, String],
    discription: String,
    isAvailable: Boolean,
    createdAt: Date,
    expiryDate: Date
});

const Product = mongoose.model("Product", productSchema,"grocery");

export default Product;