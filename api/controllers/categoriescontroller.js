import Categories from "../models/categories.js";

const getCategories = async (req, res) => {
    const categories = await Categories.find();
    res.json(categories);
}
const addCategories = async (req, res) => {
    try {
        const { name, categoryType, subcategory, isAvailable, images, description } = req.body;

        const existingCategory = await Categories.findOne({ name });

        if (existingCategory) {

            if (!existingCategory.subcategory.includes(subcategory)) {
                existingCategory.subcategory.push(subcategory);
            }

            await existingCategory.save();

            return res.status(200).json(existingCategory);
        }

        const newCategory = new Categories({
            name,
            categoryType,
            subcategory: [subcategory], 
            isAvailable,
            images: [images],
            description,
        });

        await newCategory.save();

        res.status(201).json(newCategory);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error adding category" });
    }
};



export { getCategories, addCategories };