import mongoose from 'mongoose';

const billItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  name: {
    type: String,
    required: true,
  },
  names: {
    en: { type: String },
    hi: { type: String },
    desi: { type: String },
  },
  category: {
    type: String,
  },
  subcategory: {
    type: String,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be greater than zero'],
  },
  unitType: {
    type: String,
    required: true,
    enum: ['gram', 'unit', 'meter'],
  },
  pricePerUnit: {
    type: Number,
    required: true,
    min: [0, 'Price cannot be negative'],
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Calculated price cannot be negative'],
  },
});

const billSchema = new mongoose.Schema(
  {
    billNumber: {
      type: String,
      required: true,
      unique: true,
      default: () => 'BILL-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    },
    items: [billItemSchema],
    totalAmount: {
      type: Number,
      required: true,
      min: [0, 'Total amount cannot be negative'],
    },
    status: {
      type: String,
      required: true,
      default: 'Unpaid',
      enum: ['Unpaid', 'Paid'],
    },
  },
  {
    timestamps: true,
  }
);

const Bill = mongoose.model('Bill', billSchema);
export default Bill;
