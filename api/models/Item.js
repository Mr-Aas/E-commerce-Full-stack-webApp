import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      en: { type: String, required: true, trim: true },
      hi: { type: String, required: true, trim: true },
      desi: { type: String, required: true, trim: true },
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be negative'],
    },
    unitType: {
      type: String,
      required: true,
      enum: ['gram', 'unit', 'meter'],
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    subcategory: {
      type: String,
      required: true,
      trim: true,
    },
    subcategoryType: {
      type: String,
      enum: ['Perishable', 'NonPerishable'],
      required: true,
    },
    brand: {
      type: String,
      trim: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
    images: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      trim: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    expiryDate: {
      type: Date,
      required: function requiredExpiryDate() {
        return this.subcategoryType === 'Perishable';
      },
    },
  },
  { timestamps: true }
);

productSchema.index({
  'name.en': 'text',
  'name.hi': 'text',
  'name.desi': 'text',
  brand: 'text',
  description: 'text',
});

const Product = mongoose.model('Product', productSchema, 'products');
export default Product;
