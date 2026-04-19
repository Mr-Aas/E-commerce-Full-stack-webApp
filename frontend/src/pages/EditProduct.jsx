import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, useLoaderData } from "react-router-dom";
import { getProductById, updateProduct } from "../api/productApi";
import CaptureImage from "../utils/CaptureImage";
import { LanguageContext } from "../context/languageContext";
import api from "../api/axios";

export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const categoriesData = useLoaderData();
    const { lang } = useContext(LanguageContext);

    const [form, setForm] = useState(null);
    const [imageBlob, setImageBlob] = useState(null);
    const [loading, setLoading] = useState(false);

    // 📦 Fetch product
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await getProductById(id);
                const product = res.data;

                // 🔥 find subcategoryType from categories
                const categoryObj = categoriesData.find(
                    (cat) => cat.name.en === product.category
                );

                const subObj = categoryObj?.subcategory?.find(
                    (sub) => sub.name.en === product.subcategory
                );

                setForm({
                    ...product,
                    subcategoryType: subObj?.categoryType || ""
                });

            } catch (err) {
                console.error(err);
            }
        }
        fetchData();
    }, [id, categoriesData]);

    if (!form) return <div>Loading...</div>;

    const handleCapture = (blob) => {
        setImageBlob(blob);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => {

            // CATEGORY CHANGE
            if (name === "category") {
                return {
                    ...prev,
                    category: value,
                    subcategory: "",
                    subcategoryType: ""
                };
            }

            // SUBCATEGORY CHANGE
            if (name === "subcategory") {
                const categoryObj = categoriesData.find(
                    (cat) => cat.name.en === prev.category
                );

                const subObj = categoryObj?.subcategory?.find(
                    (sub) => sub.name.en === value
                );

                return {
                    ...prev,
                    subcategory: value,
                    subcategoryType: subObj?.categoryType || ""
                };
            }

            // NAME MULTILANG
            if (name.startsWith("name.")) {
                const langKey = name.split(".")[1];
                return {
                    ...prev,
                    name: {
                        ...prev.name,
                        [langKey]: value
                    }
                };
            }

            return {
                ...prev,
                [name]: value
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = form.image;

            // if new image captured → upload
            if (imageBlob) {
                const formData = new FormData();
                formData.append("image", imageBlob);

                const res = await api.post("/upload", formData);
                imageUrl = res.data.url;
            }

            await updateProduct(id, {
                ...form,
                image: imageUrl
            });

            alert("Product updated");
            navigate("/admin");

        } catch (err) {
            console.error(err);
            alert("Update failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow">
                <h2 className="text-2xl font-semibold mb-6 text-center">
                    Edit Product
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Category + Subcategory */}
                    <div className="flex gap-2">
                        <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-xl"
                        >
                            {categoriesData.map((cat) => (
                                <option key={cat._id} value={cat.name.en}>
                                    {cat.name?.[lang] || cat.name?.en}
                                </option>
                            ))}
                        </select>

                        <select
                            name="subcategory"
                            value={form.subcategory}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-xl"
                        >
                            {categoriesData
                                .find((cat) => cat.name.en === form.category)
                                ?.subcategory?.map((sub) => (
                                    <option key={sub._id} value={sub.name.en}>
                                        {sub.name?.[lang] || sub.name?.en}
                                    </option>
                                ))}
                        </select>
                    </div>

                    {/* Names */}
                    <div className="grid grid-cols-3 gap-2">
                        <input
                            name="name.en"
                            value={form.name.en}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-xl"
                        />
                        <input
                            name="name.hi"
                            value={form.name.hi}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-xl"
                        />
                        <input
                            name="name.desi"
                            value={form.name.desi}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-xl"
                        />
                    </div>

                    <input
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-xl"
                    />
                    <input
                        name="unitType"
                        value={form.unitType}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-xl"
                    />

                    {/* EXPIRY */}
                    {form.subcategoryType?.toLowerCase() === "perishable" && (
                        <input
                            type="date"
                            name="expiryDate"
                            value={form.expiryDate || ""}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-xl"
                        />
                    )}

                    <input
                        name="stock"
                        value={form.stock}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-xl"
                    />

                    {/* CURRENT IMAGE */}
                    {form.image && (
                        <img
                            src={form.image}
                            className="w-32 h-32 object-cover rounded-xl"
                        />
                    )}

                    {/* NEW IMAGE */}
                    <CaptureImage onCapture={handleCapture} />

                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-xl"
                    />

                    <button className="w-full bg-black text-white py-3 rounded-xl">
                        {loading ? "Updating..." : "Update Product"}
                    </button>
                </form>
            </div>
        </div>
    );
}