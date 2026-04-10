import { useEffect, useState, useContext } from "react";
import { LanguageContext } from "../context/languageContext.jsx";
import api from "../api/axios.js";
import Itemcard from "../components/Itemcard.jsx";


function ProductsPage() {
    const { lang } = useContext(LanguageContext);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts(lang)
            .then(res => setProducts(res.data))
            .catch(err => console.log(err));
    }, [lang]);

    return (
        <div>
            <h2>Products</h2>

            {data.map((product) => (
                <div
                    key={product.id}
                    className="group shrink-0 basis-1/2 sm:basis-1/3 lg:basis-1/6 flex flex-col h-[280px] bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                    {/* IMAGE */}
                    <div className="h-[160px] flex items-center justify-center bg-gray-50 overflow-hidden">
                        <img
                            src={product.images?.[0]}
                            alt={`${product.name} photo`}
                            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
                        />
                    </div>

                    {/* CONTENT */}
                    <div className="flex flex-col justify-between flex-1 p-3">
                        <div className="text-sm font-medium text-gray-800 line-clamp-2">
                            {product.name}
                        </div>

                        <div className="text-lg font-semibold text-gray-900 mt-1">
                            ₹{product.price}
                        </div>

                        <div className="text-xs mt-1">
                            {product.isAvailable > 0 ? (
                                <span className="text-green-600 font-medium">
                                    In stock {product.stock}
                                </span>
                            ) : (
                                <span className="text-red-500 font-medium">
                                    Out of stock
                                </span>
                            )}
                        </div>

                        <button className="mt-2 bg-blue-600 text-white text-sm py-1.5 rounded-md hover:bg-blue-700 transition">
                            Add to Cart
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProductsPage;