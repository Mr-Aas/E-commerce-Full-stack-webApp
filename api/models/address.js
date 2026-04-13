// models/Address.js
import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      match: /^[6-9]\d{9}$/, // Indian phone validation
    },

    alternatePhone: {
      type: String,
      match: /^[6-9]\d{9}$/,
    },

    addressLine1: {
      type: String,
      required: true,
      trim: true,
    },

    addressLine2: {
      type: String,
      trim: true,
    },

    landmark: {
      type: String,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      index: true,
    },

    state: {
      type: String,
      required: true,
      index: true,
    },

    postalCode: {
      type: String,
      required: true,
      match: /^[1-9][0-9]{5}$/, // Indian pincode
      index: true,
    },

    country: {
      type: String,
      default: "India",
    },

    addressType: {
      type: String,
      enum: ["home", "work", "other"],
      default: "home",
    },

    isDefault: {
      type: Boolean,
      default: false,
    },

    // 🔥 Future: for delivery distance calculation
    location: {
      lat: { type: Number },
      lng: { type: Number },
    },

    // 🔥 Soft delete (important in production)
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Address", addressSchema);