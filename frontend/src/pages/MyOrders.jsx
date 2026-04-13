// pages/MyOrders.jsx

import React, { useEffect, useState } from "react";
import {getMyOrders} from "../features/orders/orderApi.js"
import OrderCard from "../components/orderCard.jsx";


function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getMyOrders();
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        Loading orders...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <h2 className="text-xl font-semibold">No Orders Yet</h2>
        <p className="text-gray-500 mt-2">
          Start shopping to see your orders here
        </p>
      </div>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>

      {orders.map((order) => (
        <OrderCard key={order._id} order={order} />
      ))}
    </section>
  );
}

export default MyOrders;