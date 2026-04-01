import Product from "../models/product.js";

const getProducts = async (req, res) => {
    const {category} = req.params;
    const products = await Product.find(
        {category}
    );

    res.json(products);
}
const addProducts = async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save()
    res.json(newProduct);
}

export { getProducts, addProducts };