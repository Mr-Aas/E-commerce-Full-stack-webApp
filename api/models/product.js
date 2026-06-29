import mongoose from 'mongoose';
// {
//           name: "Wheat Flour",
//           unitType: "gram",
//           price: 32,
//           stock: 0,
//           querySearch:
//             "gehu atta, gehun atta, aata, atta, wheat flour, flour, chakki atta, gehu ka atta"
//         },
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    pricePerUnit: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be negative'],
    },
    unitType: {
      type: String,
      required: true,
      enum: ['gram', 'unit', 'meter'],
    },
    searchQuery: {
      type: String,
      trim: true,
    },
    stock: {
      type: Number,
      default: 0,
    },

  },
  { timestamps: true }
);

productSchema.index({
  name: 'text',
  querySearch: 'text',
});

const Product = mongoose.model('Items', productSchema, 'products');
export default Product;
