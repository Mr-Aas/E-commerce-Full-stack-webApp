import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function AddCategory() {
    const [form, setForm] = useState({
        name: "",
        categoryType: "",
        subcategory: "",
        isAvailable: false,
        image: "",
        description: "",
    });
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await api.post("/categories/addcategory", form)

            const data = res.data
            console.log(data);

            alert("Product added successfully");

            setForm({
                name: "",
                categoryType: "",
                subcategory: "",
                isAvailable: false,
                image: "",
                description: "",
            });
            navigate("/addproducts")
            
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
                    Add New Category
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="text"
                        name="name"
                        placeholder="Category name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-xl"
                        required
                    />

                    <select
                        name="categoryType"
                        value={form.categoryType}
                        onChange={handleChange}
                        className="w-full p-3  border rounded-xl "
                        required
                    >
                        <option value="">Select CategoryType</option>
                        <option value="Perishable">Perishable</option>
                        <option value="nonPerishable">Non Perishable</option>

                    </select>

                    <input
                        type="text"
                        name="subcategory"
                        placeholder="subCategory name"
                        value={form.subcategory}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-xl"
                        required
                    />
                    <div className="isavailable w-full gap-2 flex item-center h-4 ">

                        <input
                            type="checkbox"
                            name="isAvailable"
                            id="isAvailable"
                            checked={form.isAvailable}
                            onChange={handleChange}
                        />
                        <label htmlFor="isAvailable" className="w-full h-full items-center flex">
                            Is Available
                        </label>
                    </div>
                    <input
                        type="text"
                        name="images"
                        placeholder="enter category-image URL"
                        value={form.images}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-xl"
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
                        {loading ? "Adding..." : "Add Category"}
                    </button>
                </form>
            </div>
        </div>
    );
}
