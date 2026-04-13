import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const SelectAddress = () => {
  const [addresses, setAddresses] = useState([]);
  const navigate = useNavigate();

  const fetchAddresses = async () => {
    try {
      const res = await api.get("/address");
      setAddresses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  // 🗑️ DELETE
  const handleDelete = async (id) => {
    try {
      await api.delete(`/address/${id}`);
      fetchAddresses(); // refresh
    } catch (err) {
      console.error(err);
    }
  };

const handleEdit = (addr) => {
  navigate(`/checkout/address/edit/${addr._id}`);
};

  if (addresses.length === 0) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-gray-500">
        <p>No saved addresses</p>
        <button
          onClick={() => navigate("/checkout/address/new")}
          className="mt-4 bg-black text-white px-4 py-2 rounded"
        >
          Add Address
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Select Delivery Address
          </h2>

          <button
            onClick={() => navigate("/checkout/address/new")}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            + Add New
          </button>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-6">
          {addresses.map((addr) => (
            <div
              key={addr._id}
              className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-lg transition relative group"
            >
              {/* DEFAULT TAG */}
              {addr.isDefault && (
                <span className="absolute top-3 right-3 text-xs bg-black text-white px-2 py-1 rounded">
                  Default
                </span>
              )}

              {/* ADDRESS TYPE */}
              <div className="text-sm font-medium text-gray-500 mb-1 uppercase">
                {addr.addressType}
              </div>

              {/* NAME */}
              <h3 className="text-lg font-semibold text-gray-800">
                {addr.fullName}
              </h3>

              {/* PHONE */}
              <p className="text-sm text-gray-600">
                {addr.phone}
              </p>

              {/* ADDRESS */}
              <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                {addr.addressLine1}, {addr.addressLine2 && addr.addressLine2 + ","}
                <br />
                {addr.city}, {addr.state} - {addr.postalCode}
              </p>

              {/* ACTIONS */}
              <div className="flex justify-between items-center mt-4">

                <button
                  onClick={() =>
                    navigate("/checkout/payment", { state: addr })
                  }
                  className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800"
                >
                  Deliver Here
                </button>

                <div className="flex gap-3 text-sm">
                  <button
                    onClick={() => handleEdit(addr)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(addr._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectAddress;