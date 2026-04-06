import Product from "../models/product.js";

const getProducts = async (req, res) => {
    const { category } = req.params;
    const products = await Product.find(
        { category }
    );

    res.json(products);
}
const addProducts = async (req, res) => {
    try {
        console.log(req.body);

        const { name, price, category, categoryType, subcategory, expiryDate, stock, image, description } = req.body;

        const newProduct = new Product({
            name,
            price,
            category,
            categoryType,
            subcategory,
            expiryDate,
            stock,
            images: [image], // or path
            description,
        });

        await newProduct.save();

        res.status(201).json(newProduct);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error adding product" });
    }
};

export { getProducts, addProducts };