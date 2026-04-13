import React, { useState } from "react";
import { useSelector } from "react-redux";
import api from "../api/axios";

const Checkout = () => {
  const { items } = useSelector((state) => state.cart);

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const [address, setAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: ""
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    try {
      await api.post("/orders", {
        items,
        shippingAddress: address,
        paymentMethod: "COD"
      });

      alert("Order placed successfully");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">

        {/* LEFT: FORM */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Checkout
          </h2>

          {/* SECTION: ADDRESS */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4 text-gray-700">
              Shipping Address
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <input
                name="address"
                placeholder="Street Address"
                onChange={handleChange}
                className="col-span-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
              <input
                name="city"
                placeholder="City"
                onChange={handleChange}
                className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
              <input
                name="postalCode"
                placeholder="Postal Code"
                onChange={handleChange}
                className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
              <input
                name="country"
                placeholder="Country"
                onChange={handleChange}
                className="col-span-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          {/* SECTION: PAYMENT */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-gray-700">
              Payment Method
            </h3>

            <div className="flex items-center gap-3 border p-4 rounded-lg cursor-pointer hover:border-black">
              <input type="radio" checked readOnly />
              <span className="text-gray-700">Cash on Delivery</span>
            </div>
          </div>
        </div>

        {/* RIGHT: SUMMARY */}
        <div className="bg-white p-6 rounded-2xl shadow-md h-fit sticky top-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Order Summary
          </h2>

          {/* ITEMS */}
          <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex justify-between text-sm text-gray-700"
              >
                <span className="line-clamp-1">
                  {item.name} × {item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          {/* DIVIDER */}
          <hr className="my-4" />

          {/* PRICING */}
          <div className="space-y-2 text-gray-600 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{totalPrice}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
          </div>

          <hr className="my-4" />

          {/* TOTAL */}
          <div className="flex justify-between text-lg font-bold text-gray-900">
            <span>Total</span>
            <span>₹{totalPrice}</span>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleCheckout}
            className="w-full mt-6 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition duration-200"
          >
            Place Order
          </button>

          {/* SECURITY NOTE */}
          <p className="text-xs text-gray-400 mt-3 text-center">
            Secure checkout • 100% safe payment
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;