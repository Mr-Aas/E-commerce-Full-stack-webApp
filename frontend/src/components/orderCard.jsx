// components/orders/OrderCard.jsx

import OrderItem from "./orderItems";

const statusColors = {
  PLACED: "bg-yellow-100 text-yellow-700",
  SHIPPED: "bg-blue-100 text-blue-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

function OrderCard({ order }) {

  const orderStatusForAddress = () => {
    if (order.orderStatus === "DELIVERED") {
      return true
    }
    false
  }
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 space-y-4 hover:shadow-md transition">

      {/* HEADER */}
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div>
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="font-semibold text-gray-800">{order._id}</p>
        </div>

        <span
          className={`px-3 py-1 text-xs rounded-full font-medium ${statusColors[order.orderStatus]}`}
        >
          {order.orderStatus}
        </span>
      </div>

      {/* ITEMS */}
      <div className="space-y-3">
        {order.items.map((item) => (
          <OrderItem key={item.productId} item={item} />
        ))}
      </div>
      <div className="flex justify-between items-center flex-wrap gap-3 pt-3 border-t">

        <div className="text-sm text-gray-500">
          Shipping charges
        </div>

        <div className="text-lg font-bold text-gray-900">
          ₹{order.pricing?.shipping}
        </div>
      </div>
      {/* FOOTER */}
      <div className="flex justify-between items-center flex-wrap gap-3 pt-3 border-t">

        <div className="text-sm text-gray-500">
          {new Date(order.createdAt).toLocaleDateString("en-GB")}
        </div>

        <div className="text-lg font-bold text-gray-900">
          ₹{order.pricing?.total}
        </div>
      </div>

      {/* ADDRESS */}
      <div className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
        <h4>{orderStatusForAddress ? "Shipped Address" : "shipping address"}</h4>
        <p className="font-medium">{order.shippingAddress?.fullName}</p>
        <p>
          {order.shippingAddress?.addressLine1},{" "}
          {order.shippingAddress?.city}
        </p>
      </div>

    </div>
  );
}

export default OrderCard;