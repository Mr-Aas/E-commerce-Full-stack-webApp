// components/ProductCard.jsx
import { useDispatch } from "react-redux";
import { addToCart } from "./CartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addToCart({
      productId: product._id,
      price: product.price,
      quantity: 1
    }));
  };

  return (
    <button onClick={handleAdd}>
      Add to Cart
    </button>
  );
};