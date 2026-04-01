import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({
    id: String,
    name: String,
    subcategory: String,
    unitsAvailable: Number,
    images: String,
    discription: String,
    isAvailable: Boolean,
    createdAt: Date,

});

const Categeries = mongoose.model("Categeries", categoriesSchema,"categories");

export default Categeries;