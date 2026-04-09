import Order from "../models/Orders.js"
import Product from "../models/product.js"
import Sale from "../models/user.js"

const getAllProducts = async (req, res) => {

    const products = await Product.find(
    );

    res.json(products);
}
const getAllSales = async (req, res) => {

    const sales = await Order.find(
    );

    res.json(sales);
}



const getAllUsers = async (req, res) => {

    const user = await Sale.find(
    );

    res.json(user);
}

export { getAllProducts, getAllSales, getAllUsers };