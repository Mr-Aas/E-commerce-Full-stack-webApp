import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import helmet from "helmet"
import connectdb from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import dashBoardRoutes from "./routes/dashBoardRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"
import addressRoutes from "./routes/addressRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 100 requests
  message: "Too many requests, try again later"
});

const PORT = process.env.PORT || 5000;
const app = express();


app.use(limiter)
app.use(helmet())
app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://sarasaamaancom.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true
}));
// app.use(cors())



connectdb();




app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/auth", authRoutes)
app.use("/dashboard", dashBoardRoutes)
app.use("/upload", uploadRoutes);
app.use("/address", addressRoutes)
app.use("/orders", orderRoutes)


app.get('/', (req, res) => res.send('API is running...'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});