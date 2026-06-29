import mongoose from 'mongoose';
// {
//           name: "Wheat Flour",
//           unitType: "gram",
//           price: 32,
//           stock: 0,
//           querySearch:
//             "gehu atta, gehun atta, aata, atta, wheat flour, flour, chakki atta, gehu ka atta"
//         },
const billItemsSchema = new mongoose.Schema(
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

billItemsSchema.index({
  name: 'text',
  searchQuery: 'text',
});

const items = mongoose.model('Items', billItemsSchema);
export default items;
