import { useState } from "react";
import api from "../api/axios";
import { useNavigate, useLoaderData } from "react-router-dom";



export default function AddSubCategory() {
    const categoriesData = useLoaderData()
    const [form, setForm] = useState({
        categoryId: "",
        subcategory: {
            en: "",
            hi: "",
            desi: ""
        },
        subcategoryType: "",
        subCategoryImages: "",
        subcategoryDescription: ""
    });
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await api.post(`/categories/${form.categoryId}/subcategory`, {
                subcategory: form.subcategory,
                subCategoryImages: form.subCategoryImages,
                subcategoryType: form.subcategoryType,
                subcategoryDescription: form.subcategoryDescription
            });

            const data = res.data
            console.log(data);

            alert("SubCategory added successfully");

            setForm({
                categoryId: "",
                subcategory: {
                    en: "",
                    hi: "",
                    desi: ""
                },
                subcategoryType: "",
                subCategoryImages: "",
                subcategoryDescription: ""
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
                    Add New SubCategory
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <select
                        name="categoryId"
                        value={form.categoryId}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-xl"
                        required
                    >
                        <option value="">Select Category</option>
                        {categoriesData.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                                {cat.name?.en}
                            </option>
                        ))}
                    </select>

                    <select
                        name="subcategoryType"
                        value={form.subcategoryType}
                        onChange={handleChange}
                        className="w-full p-3  border rounded-xl "
                        required
                    >
                        <option value="">Select CategoryType</option>
                        <option value="Perishable">Perishable</option>
                        <option value="nonPerishable">Non Perishable</option>

                    </select>

                    <div className="grid grid-cols-3 gap-2">

                        <input
                            placeholder="Name (English)"
                            value={form.subcategory.en}
                            className="w-full p-3  border rounded-xl "
                            required
                            onChange={(e) =>
                                setForm(prev => ({
                                    ...prev,
                                    subcategory: {
                                        ...prev.subcategory,
                                        en: e.target.value
                                    }
                                }))
                            }
                        />

                        <input
                            placeholder="Name (Hindi)"
                            value={form.subcategory.hi}
                            className="w-full p-3  border rounded-xl "
                            required
                            onChange={(e) =>
                                setForm(prev => ({
                                    ...prev,
                                    subcategory: {
                                        ...prev.subcategory,
                                        hi: e.target.value
                                    }
                                }))
                            }
                        />

                        <input
                            placeholder="Name (Desi)"
                            value={form.subcategory.desi}
                            className="w-full p-3  border rounded-xl "
                            required
                            onChange={(e) =>
                                setForm(prev => ({
                                    ...prev,
                                    subcategory: {
                                        ...prev.subcategory,
                                        desi: e.target.value
                                    }
                                }))
                            }
                        />
                    </div>

                    <input
                        type="text"
                        name="subCategoryImages"
                        placeholder="enter category-image URL"
                        value={form.subCategoryImages}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-xl"
                    />
                    <textarea
                        type="text"
                        name="subcategoryDescription"
                        placeholder="enter description"
                        value={form.subcategoryDescription}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-xl"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-3 rounded-xl"
                    >
                        {loading ? "Adding..." : "Add SubCategory "}
                    </button>
                </form>
            </div>
        </div>
    );
}