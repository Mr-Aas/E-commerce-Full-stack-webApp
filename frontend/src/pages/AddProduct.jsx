import { useState } from "react";
import api from "../api/axios";

export default function AddProduct() {
    const [form, setForm] = useState({
        name: "",
        price: "",
        category: "",
        stock: "",
        image: null,
        description: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "image") {
            setForm({ ...form, image: files[0] });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {


            const formData = new FormData();
            formData.append("name", form.name);
            formData.append("price", form.price);
            formData.append("category", form.category);
            formData.append("stock", form.stock);
            formData.append("description", form.description);
            formData.append("image", form.image);

            const res = await api.post("/products/addproduct", formData)

            const data = await res.json();
            console.log(data);

            alert("Product added successfully");

            setForm({
                name: "",
                price: "",
                category: "",
                stock: "",
                image: null,
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

                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-xl"
                        required
                    />

                    <input
                        type="number"
                        name="stock"
                        placeholder="Stock"
                        value={form.stock}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-xl"
                        required
                    />

                    <input
                        type="file"
                        name="image"
                        accept="image/*"
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
