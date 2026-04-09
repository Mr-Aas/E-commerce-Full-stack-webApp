import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

console.log("Cloud:", process.env.CLOUD_NAME);
console.log("Key:", process.env.API_KEY);
console.log("Secret:", process.env.API_SECRET);

export default cloudinary;