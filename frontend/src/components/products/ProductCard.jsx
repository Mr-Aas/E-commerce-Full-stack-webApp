export default function ProductCard({ product }) {
  return (
    <div className="border rounded-lg p-2 sm:p-3 shadow-sm w-full">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-24 sm:h-28 md:h-32 object-cover rounded"
      />

      <h2 className="text-sm sm:text-base font-semibold mt-2 truncate">
        {product.name}
      </h2>

      <p className="text-gray-600 text-sm">₹{product.price}</p>

      <button className="bg-blue-500 hover:bg-blue-600 transition-colors text-white text-xs sm:text-sm px-3 py-1.5 mt-2 rounded w-full">
        Add to Cart
      </button>
    </div>
  );
}

