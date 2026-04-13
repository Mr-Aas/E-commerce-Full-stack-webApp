import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LanguageContext } from "../context/languageContext";

export default function ProductRow({ product, onDelete }) {
    const navigate = useNavigate();
    const {lang } = useContext(LanguageContext)

    return (
        <div className="bg-white p-4 flex justify-between items-center rounded-xl shadow mb-2">

            <div>
                <p className="font-semibold">{product?.name?.[lang]}</p>
                <p className="text-sm text-gray-500">
                    ₹{product.price} | {product.category} → {product.subcategory}
                </p>
            </div>

            <div className="flex gap-2">
                {/* EDIT */}
                <button
                    onClick={() => navigate(`/editproduct/${product._id}`)}
                    className="px-3 py-1 bg-blue-500 text-white rounded-lg"
                >
                    Edit
                </button>

                {/* DELETE */}
                <button
                    onClick={() => onDelete(product._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}