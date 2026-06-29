import mongoose from "mongoose";
import dotenv from "dotenv";

import Product from "./models/Item.js";
import BillItems from "./models/billItems.js"
dotenv.config({
    path: "./api/.env"
});

async function migrate() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        // Fetch all products
        const products = await Product.find();

        console.log(`Found ${products.length} products`);

        const transformedItems = products.map((product) => ({
            name: product.name.desi,
            pricePerUnit: product.price,
            unitType: product.unitType,
            searchQuery: product.description || "",
            stock: product.stock,
        }));
        console.log(BillItems)
        await BillItems.insertMany(transformedItems);

        console.log(`Successfully inserted ${transformedItems.length} bill items`);
        console.log(`Successfully inserted ${billItems.length} bill items`);

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

migrate();