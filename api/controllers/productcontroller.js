import Product from "../models/product.js";

const getProducts = async (req, res) => {
    const products = await Product.find(
        {category:"hardware"}
    );
    res.json(products);
}
const addProducts = async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save()
    res.json(newProduct);
}

export { getProducts, addProducts };