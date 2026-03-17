export default function ProductCard({ product }) {
    return (
        <div className="border rounded-xl p-4 shadow-md w-64">

            <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded"
            />

            <h2 className="text-lg font-semibold mt-2">
                {product.name}
            </h2>

            <p className="text-gray-600">
                ₹{product.price}
            </p>

            <button className="bg-blue-500 text-white px-4 py-2 mt-3 rounded">
                Add to Cart
            </button>

        </div>
    );
}
