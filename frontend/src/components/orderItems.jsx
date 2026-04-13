// components/orders/OrderItem.jsx

function OrderItem({ item }) {
  return (
    <div className="flex gap-4">
      <img
        src={item.image}
        className="w-16 h-16 rounded-lg object-cover border"
      />

      <div className="flex-1">
        <p className="font-medium text-gray-800">{item.name?.en}</p>
        <p className="text-sm text-gray-500">
          ₹{item.price} × {item.quantity}
        </p>
      </div>

      <p className="font-semibold">
        ₹{item.price * item.quantity}
      </p>
    </div>
  );
}

export default OrderItem;