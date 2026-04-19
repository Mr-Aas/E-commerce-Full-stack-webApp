import Product from "../models/product.js";

const getProducts = async (req, res) => {
    try {
        const { category } = req.params;
        const products = await Product.find({ category });
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const addProducts = async (req, res) => {
    try {
        console.log(req.body);

        const { name, price,unitType, category, subcategoryType, subcategory, expiryDate, stock, image, description } = req.body;

        const newProduct = new Product({
            name,
            price,
            unitType,
            category,
            subcategoryType,
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

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE PRODUCT
const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
    try {
        const updated = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const searchProducts = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q || q.trim() === "") {
            return res.json([]);
        }

        const products = await Product.find(
            { $text: { $search: q } },
            {
                score: { $meta: "textScore" }
            }
        )
            .sort({ score: { $meta: "textScore" } }) // 🔥 relevance
            .limit(10) // 🚀 limit results
            .select("name price unitType images stock isAvailable");

        res.json(products);

    } catch (error) {
        console.log("SEARCH ERROR:", error);
        res.status(500).json({ message: error.message });
    }
};


export { getProducts, addProducts, getProductById, deleteProduct, updateProduct ,searchProducts};