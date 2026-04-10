import { useState } from "react";
import api from "../api/axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import CaptureImage from "../utils/CaptureImage";

export default function AddProduct() {
    const categoriesData = useLoaderData();
    const Navigate = useNavigate();

    const [imageBlob, setImageBlob] = useState(null);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        price: "",
        category: "",
        categoryType: "",
        subcategory: "",
        expiryDate: "",
        stock: "",
        image: [], // ✅ ARRAY
        description: "",
    });

    const handleCapture = (blob) => {
        setImageBlob(blob);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => {
            if (name === "category") {
                const selectedCategoryObj = categoriesData.find(
                    (cat) => cat.name === value
                );

                return {
                    ...prev,
                    category: value,
                    categoryType: selectedCategoryObj?.categoryType || "",
                    subcategory: selectedCategoryObj?.subcategory?.[0]?.name || ""
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
            // 1️⃣ Upload image
            const formData = new FormData();
            formData.append("image", imageBlob);

            const uploadRes = await api.post("/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const imageUrl = uploadRes.data.url;

            // 2️⃣ Send product
            await api.post("/products/addproduct", {
                ...form,
                image: imageUrl,
            });

            alert("Product added successfully");

            setForm({
                name: "",
                price: "",
                category: "",
                categoryType: "",
                subcategory: "",
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
                                <option key={cat._id} value={cat.name}>
                                    {cat.name}
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
                                    .find((cat) => cat.name === form.category)
                                    ?.subcategory?.map((sub) => (
                                        <option key={sub._id} value={sub.name}>
                                            {sub.name}
                                        </option>
                                    ))}
                        </select>

                        <button
                            type="button"
                            onClick={() => Navigate("/addcategory")}
                            className="w-[200px] bg-black text-white rounded-xl"
                        >
                            Add New
                        </button>
                    </div>

                    {/* Inputs */}
                    <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} className="w-full p-3 border rounded-xl" required />
                    <input name="price" placeholder="Price" value={form.price} onChange={handleChange} className="w-full p-3 border rounded-xl" required />

                    {form.categoryType === "Perishable" && (
                        <input type="date" name="expiryDate" value={form.expiryDate} onChange={handleChange} className="w-full p-3 border rounded-xl" required />
                    )}

                    <input type="number" name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} className="w-full p-3 border rounded-xl" />

                    {/* 📸 CAMERA */}
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