import Categories from "../models/categories.js";
import mongoose from "mongoose";

const getCategories = async (req, res) => {
    const categories = await Categories.find();
    res.json(categories);
}
const addCategory = async (req, res) => {
    try {
        const { name, image, isAvailable, description } = req.body;

        const newCategory = new Categories({
            name,
            images: [image],
            description,
            isAvailable,
        });
        await newCategory.save();
        res.status(201).json(newCategory);

    } catch (err) {
        res.status(500).json({ message: "Error adding category" });
    }
};

const addSubCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { subcategory, subCategoryImages, subcategoryType, subcategoryDescription } = req.body;

        console.log("BODY:", req.body);
        console.log("PARAMS:", req.params);

        // ✅ validate id
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({ message: "Invalid categoryId" });
        }

        if (!subcategory) {
            return res.status(400).json({ message: "Subcategory required" });
        }

        const category = await Categories.findById(categoryId);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        if (!category.subcategory) {
            category.subcategory = [];
        }

        const exists = category.subcategory.find(
            (sub) => sub.name === subcategory
        );

        if (exists) {
            return res.status(400).json({ message: "Subcategory already exists" });
        }

        category.subcategory.push({
            name: subcategory,
            images: subCategoryImages
                ? (Array.isArray(subCategoryImages)
                    ? subCategoryImages
                    : [subCategoryImages])
                : [],
            description: subcategoryDescription,
            categoryType: subcategoryType,
        });

        await category.save();

        res.status(200).json(category);

    } catch (err) {
        console.error("FULL ERROR:", err);   // 🔥 THIS IS KEY
        res.status(500).json({ message: err.message });
    }
};


export { getCategories, addCategory, addSubCategory };