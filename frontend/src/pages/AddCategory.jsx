import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function AddCategory() {
    const [form, setForm] = useState({
        name: {
            en: "",
            hi: "",
            desi: ""
        },
        categoryType: "",
        isAvailable: true,
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
            const res = await api.post("/categories", form)

            const data = res.data
            console.log(data);

            alert("Category added successfully");

            setForm({
                name: {
                    en: "",
                    hi: "",
                    desi: ""
                },
                categoryType: "",
                isAvailable: true,
                image: "",
                description: "",
            });
            navigate("/addsubcategory")

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
                    <div className="grid grid-cols-3 gap-2">

                        <input
                            placeholder="Name (English)"
                            value={form.name.en}
                            className="w-full p-3  border rounded-xl "
                        required
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
                            className="w-full p-3  border rounded-xl "
                        required
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
                            className="w-full p-3  border rounded-xl "
                        required
                            onChange={(e) =>
                                setForm(prev => ({
                                    ...prev,
                                    name: { ...prev.name, desi: e.target.value }
                                }))
                            }
                        />
                    </div>

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
                        name="image"
                        placeholder="enter category-image URL"
                        value={form.image}
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