import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },

      name: String, // snapshot
      image: String, // snapshot

      quantity: {
        type: Number,
        required: true
      },

      priceAtPurchase: {
        type: Number,
        required: true
      },

      totalPrice: {
        type: Number,
        required: true
      }
    }
  ],

  // 💰 Pricing
  subtotal: Number,
  discount: {
    type: Number,
    default: 0
  },
  shippingCharge: {
    type: Number,
    default: 0
  },
  totalAmount: Number,

  // 💳 Payment
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed", "refunded"],
    default: "pending"
  },

  paymentMethod: {
    type: String,
    enum: ["COD", "UPI", "CARD"]
  },

  paymentId: String, // Razorpay / Stripe ID

  // 📦 Order Status
  orderStatus: {
    type: String,
    enum: [
      "placed",
      "confirmed",
      "shipped",
      "out_for_delivery",
      "delivered",
      "cancelled",
      "returned"
    ],
    default: "placed"
  },

  // 📍 Shipping Address (snapshot)
  shippingAddress: {
    name: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    pincode: String
  },

  // 🕒 Tracking
  placedAt: {
    type: Date,
    default: Date.now
  },

  paidAt: Date,
  deliveredAt: Date,
  cancelledAt: Date

}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema, "orders");
export default Order