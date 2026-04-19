import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    name: {
        en: { type: String, required: true },
        hi: { type: String, required: true },
        desi: { type: String, required: true }
    },

    price: {
        type: Number,
        required: true
    },

    unitType: {
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

    subcategoryType: {
        type: String,
        enum: ["Perishable", "NonPerishable"],
        required: true
    },

    brand: String,

    stock: Number,

    images: {
        type: [String],
        default: []
    }
    ,

    description: String,

    isAvailable: {
        type: Boolean,
        default: true
    },

    expiryDate: {
        type: Date,
        required: function () {
            return this.subcategoryType === "Perishable";
        }
    }

}, { timestamps: true });

productSchema.index({
    "name.en": "text",
    "name.hi": "text",
    "name.desi": "text",
    brand: "text",
    description: "text"
});

const Product = mongoose.model("Product", productSchema, "products");

export default Product;