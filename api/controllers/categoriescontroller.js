import Categories from "../models/categories.js";

const getCategories = async (req, res) => {
    const categories = await Categories.find();
    res.json(categories) ;
}
const addCategories = async (req, res) => {
    const newCategory = new Categories(req.body);
    await newCategory.save()
    res.json(newCategory);
}

export { getCategories, addCategories };