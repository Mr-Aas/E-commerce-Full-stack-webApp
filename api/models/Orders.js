import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

  // 👤 USER
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  // 🛒 ITEMS SNAPSHOT (IMPORTANT: NEVER TRUST PRODUCT LATER)
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      name: {
        en: { type: String },
        hi: { type: String },
        desi: { type: String }
      },
      image: String,
      price: Number,
      quantity: Number
    }
  ],

  // 📍 SHIPPING ADDRESS SNAPSHOT
  shippingAddress: {
    fullName: String,
    phone: String,
    addressLine1: String,
    addressLine2: String,
    landmark: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  },

  // 💰 PRICING BREAKDOWN
  pricing: {
    subtotal: Number,
    shipping: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    total: Number
  },

  // 💳 PAYMENT
  paymentMethod: {
    type: String,
    enum: ["COD", "UPI", "CARD"],
    default: "COD"
  },

  paymentStatus: {
    type: String,
    enum: ["PENDING", "PAID", "FAILED"],
    default: "PENDING"
  },

  isPaid: { type: Boolean, default: false },
  paidAt: Date,

  // 🚚 ORDER STATUS
  orderStatus: {
    type: String,
    enum: ["PLACED", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"],
    default: "PLACED"
  },

  deliveredAt: Date,

}, { timestamps: true });

export default mongoose.model("Order", orderSchema, "orders");