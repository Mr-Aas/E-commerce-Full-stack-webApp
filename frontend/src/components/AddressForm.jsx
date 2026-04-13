import React, { useState, useEffect } from "react";

const AddressForm = ({ initialData, onSubmit, loading, isEdit }) => {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    alternatePhone: "",
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    addressType: "home",
    isDefault: false,
  });

  // 🔥 Prefill in edit mode
  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">

      <h2 className="text-2xl font-semibold mb-6">
        {isEdit ? "Edit Address" : "Add New Address"}
      </h2>

      {/* CONTACT */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <input
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="p-3 border rounded-lg"
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="p-3 border rounded-lg"
        />

        <input
          name="alternatePhone"
          value={form.alternatePhone}
          onChange={handleChange}
          placeholder="Alternate Phone"
          className="p-3 border rounded-lg"
        />
      </div>

      {/* ADDRESS */}
      <div className="grid gap-4 mb-6">
        <input
          name="addressLine1"
          value={form.addressLine1}
          onChange={handleChange}
          placeholder="Address Line 1"
          className="p-3 border rounded-lg"
        />

        <input
          name="addressLine2"
          value={form.addressLine2}
          onChange={handleChange}
          placeholder="Address Line 2"
          className="p-3 border rounded-lg"
        />

        <input
          name="landmark"
          value={form.landmark}
          onChange={handleChange}
          placeholder="Landmark"
          className="p-3 border rounded-lg"
        />

        <div className="grid sm:grid-cols-3 gap-4">
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City"
            className="p-3 border rounded-lg"
          />

          <input
            name="state"
            value={form.state}
            onChange={handleChange}
            placeholder="State"
            className="p-3 border rounded-lg"
          />

          <input
            name="postalCode"
            value={form.postalCode}
            onChange={handleChange}
            placeholder="Postal Code"
            className="p-3 border rounded-lg"
          />
        </div>
      </div>

      {/* TYPE */}
      <div className="flex gap-4 mb-6">
        {["home", "work", "other"].map((type) => (
          <label
            key={type}
            className={`px-4 py-2 border rounded-lg cursor-pointer ${
              form.addressType === type ? "bg-black text-white" : ""
            }`}
          >
            <input
              type="radio"
              name="addressType"
              value={type}
              checked={form.addressType === type}
              onChange={handleChange}
              className="hidden"
            />
            {type}
          </label>
        ))}
      </div>

      {/* DEFAULT */}
      <div className="flex items-center gap-2 mb-6">
        <input
          type="checkbox"
          name="isDefault"
          checked={form.isDefault}
          onChange={handleChange}
        />
        <span>Set as default</span>
      </div>

      {/* BUTTON */}
      <button
        onClick={() => onSubmit(form)}
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded-lg"
      >
        {loading
          ? "Saving..."
          : isEdit
          ? "Update Address"
          : "Save Address"}
      </button>
    </div>
  );
};

export default AddressForm;