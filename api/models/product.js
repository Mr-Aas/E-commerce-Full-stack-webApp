import mongoose from "mongoose";


const productSchema = new mongoose.Schema({

    name: {
        en: { type: String, required: true },
        hi: { type: String, required: true },
        desi: { type: String, required: true }
    },
    price: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subcategory: {
        type: String,
        required: true
    },
    brand: {
        type: String,
    },
    stock: {
        type: Number,
    },

    images: [
        {
            type: String,
            required: true
        }
    ],
    description: {
        type: String,
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    expiryDate: {
        type: Date,
        required: function () {
            return this.categoryType === "perishable";
        }
    }

},
    { timestamps: true }
);

const Product = mongoose.model("Product", productSchema, "items");

export default Product;