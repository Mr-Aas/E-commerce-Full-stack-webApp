import { useState } from "react";
import api from "../api/axios";
import categoriesData from "../data/categoriesdata";

export default function AddProduct() {
    const [form, setForm] = useState({
        name: "",
        price: "",
        category: "",
        categoryType: "",
        subcategory: "",
        expiryDate: "",
        unitsAvailable: "",
        image: "",
        description: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => {
            if (name === "category") {
                const selectedCategory = value;

                const subcategories =
                    categoriesData[selectedCategory]?.subcategories || [];

                return {
                    ...prev,
                    category: selectedCategory,
                    categoryType: categoriesData[selectedCategory]?.type || "",
                    subcategory: subcategories[0] || "" // ✅ FIXED
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
            const res = await api.post("/products/addproduct", form)

            const data = res.data
            console.log(data);

            alert("Product added successfully");

            setForm({
                name: "",
                price: "",
                category: "",
                categoryType: "",
                subcategory: "",
                expiryDate: "",
                unitsAvailable: "",
                image: "",
                description: "",
            });
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
                    <input
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-xl"
                        required
                    />

                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={form.price}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-xl"
                        required
                    />

                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-xl"
                        required
                    >
                        <option value="">Select Category</option>

                        {Object.keys(categoriesData).map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
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
                            categoriesData[form.category].subcategories.map((sub) => (
                                <option key={sub} value={sub}>
                                    {sub}
                                </option>
                            ))}
                    </select>

                    {form.categoryType === "perishable" && (
                        <input
                            type="date"
                            name="expiryDate"
                            value={form.expiryDate}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-xl"
                            required
                        />
                    )}

                    <input
                        type="number"
                        name="unitsAvailable"
                        placeholder="unitsAvailable"
                        value={form.unitsAvailable}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-xl"
                        required
                    />

                    <input
                        type="text"
                        name="image"
                        placeholder="enter image URL"
                        value={form.image}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-xl"
                        required
                    />


                    <textarea
                        name="description"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-xl"
                        rows="4"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-3 rounded-xl"
                    >
                        {loading ? "Adding..." : "Add Product"}
                    </button>
                </form>
            </div>
        </div>
    );
}
