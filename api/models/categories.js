import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    subcategory: [{
    name: String,
    images: [String],
    description: String,
    categoryType: String  
}],
    images: [{
        type: String,

        required: true
    }],
    description: {
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