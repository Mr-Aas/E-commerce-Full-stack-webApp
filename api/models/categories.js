import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    subcategory: {
        type: [String], 
        default: []
    },
    images: [{
        type: String,
    }],
    discription: {
        type: String,
    },
    categoryType: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

},
    { timestamps: true }
);

const Categeries = mongoose.model("Categeries", categoriesSchema, "categories");

export default Categeries;