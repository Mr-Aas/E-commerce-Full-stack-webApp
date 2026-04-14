import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../api/axios";

const Payment = () => {
  const { state: address } = useLocation();
  const { items } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);

  // 🔥 Always calculate dynamically (never trust stored total)
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingcost = totalPrice >= 100 ? 0 : 20;

  // 🚀 PLACE ORDER
  const placeOrder = async () => {
    try {
      setLoading(true);

      await api.post("/orders", {
        items,
        shippingAddress: address,
        paymentMethod,
      });

      navigate("/success");

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6">

        {/* ================= LEFT SIDE ================= */}
        <div className="lg:col-span-2 space-y-6">

          {/* 🧾 ADDRESS BLOCK */}
          <div className="bg-white p-5 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-3">
              Delivery Address
            </h2>

            <div className="text-sm text-gray-700 leading-relaxed">
              <p className="font-medium">{address.fullName}</p>
              <p>{address.phone}</p>

              <p className="mt-2">
                {address.addressLine1}, {address.addressLine2}
              </p>

              <p>
                {address.city}, {address.state} - {address.postalCode}
              </p>
            </div>

            <button
              onClick={() => navigate("/checkout/address")}
              className="mt-3 text-sm text-blue-600 hover:underline"
            >
              Change Address
            </button>
          </div>

          {/* 💳 PAYMENT METHODS */}
          <div className="bg-white p-5 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-4">
              Select Payment Method
            </h2>

            <div className="space-y-4">

              {/* ✅ COD (TOP PRIORITY) */}
              <label className="flex items-center gap-3 border p-3 rounded-lg cursor-pointer hover:border-black">
                <input
                  type="radio"
                  name="payment"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <div>
                  <p className="font-medium">Cash on Delivery</p>
                  <p className="text-sm text-gray-500">
                    Pay when your order arrives
                  </p>
                </div>
              </label>

              {/* 🔥 UPI (PLACEHOLDER) */}
              <label className="flex items-center gap-3 border p-3 rounded-lg cursor-not-allowed opacity-60">
                <input type="radio" disabled />
                <div>
                  <p className="font-medium">UPI Payment</p>
                  <p className="text-sm text-gray-500">
                    {/* TODO: Integrate Razorpay / PhonePe / Google Pay */}
                    Pay using any UPI app
                  </p>
                </div>
              </label>

              {/* 🔥 CARD (PLACEHOLDER) */}
              <label className="flex items-center gap-3 border p-3 rounded-lg cursor-not-allowed opacity-60">
                <input type="radio" disabled />
                <div>
                  <p className="font-medium">Credit / Debit Card</p>
                  <p className="text-sm text-gray-500">
                    {/* TODO: Integrate Stripe / Razorpay card flow */}
                    Secure card payments
                  </p>
                </div>
              </label>

            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="bg-white p-5 rounded-2xl shadow h-fit sticky top-20">

          <h2 className="text-lg font-semibold mb-4">
            Order Summary
          </h2>

          {/* 🛒 ITEMS */}
          <div className="space-y-2 text-sm text-gray-600 max-h-60 overflow-y-auto">
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex justify-between"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <hr className="my-4" />

          {/* 💰 PRICE DETAILS */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{totalPrice}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600">
                {/* TODO: Dynamic shipping logic */}
                {shippingcost}
              </span>
            </div>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>₹{totalPrice + shippingcost}</span>
          </div>

          {/* 🚀 PLACE ORDER */}
          <button
            onClick={placeOrder}
            disabled={loading}
            className="w-full mt-6 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>

          {/* 🔒 TRUST INFO */}
          <p className="text-xs text-gray-500 text-center mt-3">
            🔒 Secure checkout • 100% safe payments
          </p>
        </div>

      </div>
    </div>
  );
};

export default Payment;