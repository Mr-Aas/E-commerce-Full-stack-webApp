import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectdb from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

const PORT = 5000;
const app = express();

app.use(express.json());
app.use(cors());

connectdb();

app.use("/api", productRoutes);

app.get('/', (req, res) => res.send('API is running...'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});