import { useState } from "react";
import api from "../api/axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import CaptureImage from "../utils/CaptureImage";
import { useContext } from "react";
import { LanguageContext } from "../context/languageContext";

export default function AddProduct() {
    const categoriesData = useLoaderData();
    const { lang } = useContext(LanguageContext);
    const Navigate = useNavigate();

    const [imageBlob, setImageBlob] = useState(null);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: {
            en: "",
            hi: "",
            desi: ""
        },
        price: "",
        category: "",
        subcategory: "",
        subcategoryType: "",
        expiryDate: "",
        stock: "",
        image: [],
        description: "",
    });

    const handleCapture = (blob) => {
        setImageBlob(blob);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => {
            // 🔹 When category changes
            if (name === "category") {
                const selectedCategoryObj = categoriesData.find(
                    (cat) => cat.name.en === value
                );

                return {
                    ...prev,
                    category: value,
                    subcategory: "",
                    subcategoryType: "" // reset
                };
            }

            // 🔹 When subcategory changes
            if (name === "subcategory") {
                const selectedCategoryObj = categoriesData.find(
                    (cat) => cat.name.en === prev.category
                );

                const selectedSub = selectedCategoryObj?.subcategory?.find(
                    (sub) => sub.name.en === value
                );

                return {
                    ...prev,
                    subcategory: value,
                    subcategoryType: selectedSub?.categoryType?.trim() || ""
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

        if (!imageBlob) {
            alert("Please capture image first");
            return;
        }

        setLoading(true);

        try {
            // upload image
            const formData = new FormData();
            formData.append("image", imageBlob);

            const uploadRes = await api.post("/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const imageUrl = uploadRes.data.url;

            // send product
            await api.post("/products/addproduct", {
                ...form,
                image: imageUrl,
            });

            alert("Product added successfully");

            setForm({
                name: { en: "", hi: "", desi: "" },
                price: "",
                category: "",
                subcategory: "",
                subcategoryType: "",
                expiryDate: "",
                stock: "",
                image: [],
                description: "",
            });

            setImageBlob(null);

        } catch (err) {
            console.error(err);
            alert("Error adding product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow">
                <h2 className="text-2xl font-semibold mb-6 text-center">
                    Add New Product
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Category + Subcategory */}
                    <div className="flex gap-2">
                        <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-xl"
                            required
                        >
                            <option value="">Select Category</option>
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
                            disabled={!form.category}
                            className="w-full p-3 border rounded-xl"
                            required
                        >
                            <option value="">Select Subcategory</option>
                            {form.category &&
                                categoriesData
                                    .find((cat) => cat.name?.en === form.category)
                                    ?.subcategory?.map((sub) => (
                                        <option key={sub._id} value={sub.name.en}>
                                            {sub.name?.[lang] || sub.name?.en}
                                        </option>
                                    ))}
                        </select>

                    </div>
                    <button
                        type="button"
                        onClick={() => Navigate("/addsubcategory")}
                        className="w-full h-7 bg-black text-white rounded-full"
                    >
                        Add New Subcategory
                    </button>

                    {/* Inputs */}
                    <div className="grid grid-cols-3 gap-2">

                        <input
                            placeholder="Name (English)"
                            value={form.name.en}
                            className="w-full p-3 border rounded-xl" required
                            onChange={(e) =>
                                setForm(prev => ({
                                    ...prev,
                                    name: { ...prev.name, en: e.target.value }
                                }))
                            }
                        />

                        <input
                            placeholder="Name (Hindi)"
                            value={form.name.hi}
                            className="w-full p-3 border rounded-xl" required
                            onChange={(e) =>
                                setForm(prev => ({
                                    ...prev,
                                    name: { ...prev.name, hi: e.target.value }
                                }))
                            }
                        />

                        <input
                            placeholder="Name (Desi)"
                            value={form.name.desi}
                            className="w-full p-3 border rounded-xl" required
                            onChange={(e) =>
                                setForm(prev => ({
                                    ...prev,
                                    name: { ...prev.name, desi: e.target.value }
                                }))
                            }
                        />
                    </div>

                    <input name="price" placeholder="Price" value={form.price} onChange={handleChange} className="w-full p-3 border rounded-xl" required />

                    {/* ✅ NOW BASED ON SUBCATEGORY */}
                    {form.subcategoryType?.toLowerCase() === "perishable" && (
                        <div>
                            <label htmlFor="expiryDate">Select Expiry Date</label>
                            <input
                                type="date"
                                name="expiryDate"
                                value={form.expiryDate}
                                onChange={handleChange}

                                className="w-full p-3 border rounded-xl"
                                required
                            /></div>
                    )}

                    <input type="number" name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} className="w-full p-3 border rounded-xl" />

                    <CaptureImage onCapture={handleCapture} />

                    <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full p-3 border rounded-xl" />

                    <button className="w-full bg-black text-white py-3 rounded-xl">
                        {loading ? "Adding..." : "Add Product"}
                    </button>
                </form>
            </div>
        </div>
    );
}