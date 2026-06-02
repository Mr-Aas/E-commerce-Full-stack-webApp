import dotenv from "dotenv";
dotenv.config();
import express from "express";
import passport from "./config/passport.js";
import session from "express-session";
import cors from "cors";
import helmet from "helmet"
import connectDB from "./config/db.js";
import { seedDatabase } from './config/seed.js';
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import dashBoardRoutes from "./routes/dashBoardRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"
import addressRoutes from "./routes/addressRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import rateLimit from "express-rate-limit";
import itemRoutes from './routes/itemRoutes.js';
import billRoutes from './routes/billRoutes.js';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 100 requests
  message: "Too many requests, try again later"
});

// const PORT = process.env.PORT || 5000;
const app = express();
const allowedOrigins = [
  "https://smartgrahak.in",
  "https://www.smartgrahak.in",
  "https://sarasaamaan.smartgrahak.in",
  "http://localhost:5173",
  "http://localhost:3000",
];


app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (Postman, mobile apps)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use(helmet())
app.use(express.json());
app.use(limiter)




app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const initApp = async () => {
  await connectDB();
  await seedDatabase();
};
initApp();



app.use('/api/items', itemRoutes);
app.use('/api/bills', billRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/auth", authRoutes)
app.use("/dashboard", dashBoardRoutes)
app.use("/upload", uploadRoutes);
app.use("/address", addressRoutes)
app.use("/orders", orderRoutes)
app.post('/api/admin/verify-pin', (req, res) => {
  const { pin } = req.body;
  const officialPin = process.env.ADMIN_PIN || '2026';

  if (pin === officialPin) {
    res.json({ success: true, token: 'mock-admin-token-2026' }); // Return a simple mock token
  } else {
    res.status(401).json({ success: false, message: 'Invalid passcode PIN' });
  }
});

// Root Route
app.get('/calculator', (req, res) => {
  res.send('Supermarket Billing System API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong on the server' });
});

const PORT = process.env.PORT || 5000;


app.get('/', (req, res) => res.send('API is running...'));
app.use((req, res) => {
  res.sendFile(path.resolve("dist/index.html"));
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});