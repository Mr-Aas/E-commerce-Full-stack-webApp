import React, { useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
} from "../features/Cart/CartSlice.js";
import { useNavigate } from "react-router-dom";

/* ───────────────────────── Constants ───────────────────────── */
const SHIPPING_THRESHOLD = 100;
const SHIPPING_COST = 20;
const TAX_RATE = 18; // 18% GST

/* ───────────────────────── Sub-components ───────────────────── */

const QuantityControl = ({ quantity, onIncrease, onDecrease, maxQty = 10 }) => (
  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden select-none">
    <button
      onClick={onDecrease}
      disabled={quantity <= 1}
      aria-label="Decrease quantity"
      className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-gray-700 font-medium"
    >
      −
    </button>
    <span className="px-4 py-1.5 min-w-[3rem] text-center font-medium text-gray-800">
      {quantity}
    </span>
    <button
      onClick={onIncrease}
      disabled={quantity >= maxQty}
      aria-label="Increase quantity"
      className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-gray-700 font-medium"
    >
      +
    </button>
  </div>
);

const CartItem = React.memo(({ item, onRemove, onIncrease, onDecrease }) => (
  <article
    className="flex gap-4 sm:gap-5 bg-white border border-gray-100 shadow-sm rounded-2xl p-4 sm:p-5 hover:shadow-md transition-shadow duration-200"
    aria-label={`Cart item: ${item.name?.en}`}
  >
    {/* Image */}
    <div className="flex-shrink-0">
      <img
        src={item.image}
        alt={item.name?.en}
        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl border border-gray-100"
        loading="lazy"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/96x96?text=No+Image";
        }}
      />
    </div>

    {/* Details */}
    <div className="flex flex-col flex-1 min-w-0 justify-between">
      {/* Top row */}
      <div className="flex justify-between items-start gap-2">
        <div className="min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
            {item.name?.en}
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">
            ₹{item.price.toLocaleString("en-IN")} / unit
          </p>
        </div>

        <button
          onClick={() => onRemove(item.productId)}
          aria-label={`Remove ${item.name?.en} from cart`}
          className="flex-shrink-0 text-sm text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded-md transition-colors"
        >
          Remove
        </button>
      </div>

      {/* Bottom row */}
      <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
        <QuantityControl
          quantity={item.quantity}
          maxQty={item.stock}
          onIncrease={() => onIncrease(item.productId)}
          onDecrease={() => onDecrease(item.productId)}
        />

        <p className="text-lg font-semibold text-gray-900">
          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
        </p>
      </div>
    </div>
  </article>
));

CartItem.displayName = "CartItem";

const SummaryRow = ({ label, value, highlight, bold }) => (
  <div className={`flex justify-between ${bold ? "text-lg font-bold text-gray-900" : "text-gray-600"}`}>
    <span>{label}</span>
    <span className={highlight || ""}>{value}</span>
  </div>
);

const EmptyCart = ({ onShop }) => (
  <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
    <div className="text-6xl mb-4" role="img" aria-label="Empty cart">
      🛒
    </div>
    <h2 className="text-xl font-semibold text-gray-800 mb-2">
      Your cart is empty
    </h2>
    <p className="text-gray-500 mb-6 max-w-sm">
      Looks like you haven't added anything yet. Browse our collection and find
      something you love!
    </p>
    <button
      onClick={onShop}
      className="bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition-colors font-medium"
    >
      Start Shopping
    </button>
  </div>
);

/* ───────────────────────── Main Component ───────────────────── */

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);


  /* Memoised calculations */
  const totalItems = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((acc, i) => acc + i.price * i.quantity, 0),
    [items]
  );

  // const shippingcost = useMemo(
  //   () => items.reduce((acc, i) => subtotal * 0.18, 0),
  //   [items]
  // );
  // console.log(subtotal)

  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;

  const tax = subtotal * (TAX_RATE / 100);

  const total = subtotal + shipping;

  /* Stable callbacks */
  const handleRemove = useCallback(
    (id) => dispatch(removeFromCart(id)),
    [dispatch]
  );
  const handleIncrease = useCallback(
    (id) => dispatch(increaseQty(id)),
    [dispatch]
  );
  const handleDecrease = useCallback(
    (id) => dispatch(decreaseQty(id)),
    [dispatch]
  );

  /* ── Empty state ── */
  if (items.length === 0) {
    return <EmptyCart onShop={() => navigate("/")} />;
  }

  /* ── Main render ── */
  return (
    <section
      className="max-w-6xl mx-auto px-4 py-6 sm:py-8"
      aria-label="Shopping cart"
    >
      {/* Header */}
      <div className="flex items-baseline justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Shopping Cart
        </h1>
        <span className="text-sm text-gray-500">
          {totalItems} {totalItems === 1 ? "item" : "items"}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* LEFT: Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItem
              key={item.productId}
              item={item}
              onRemove={handleRemove}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
            />
          ))}

          {/* Continue shopping link */}
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition-colors mt-2"
          >
            ← Continue Shopping
          </button>
        </div>

        {/* RIGHT: Order Summary */}
        <aside
          className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 h-fit lg:sticky lg:top-20"
          aria-label="Order summary"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-5">
            Order Summary
          </h2>

          <div className="space-y-3 text-sm sm:text-base">
            <SummaryRow
              label={`Subtotal (${totalItems} items)`}
              value={`₹${subtotal.toLocaleString("en-IN")}`}
            />
            <SummaryRow
              label="Shipping"
              value={shipping === 0 ? "FREE" : `₹${shipping}`}
              highlight={shipping === 0 ? "text-green-600 font-medium" : ""}
            />
            <SummaryRow
              label="GST (18% Included)"
              value={`₹${(tax.toLocaleString("en-IN"))}`}
            />
          </div>

          {shipping > 0 && (
            <p className="text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2 mt-3">
              Add ₹{(SHIPPING_THRESHOLD - subtotal).toLocaleString("en-IN")}{" "}
              more for free shipping!
            </p>
          )}

          <hr className="my-4 border-gray-200" />

          <SummaryRow
            label="Total"
            value={`₹${total.toLocaleString("en-IN")}`}
            bold
          />

          <button
            onClick={() => navigate("/checkout/address")}
            className="w-full mt-6 bg-black text-white py-3.5 rounded-xl hover:bg-gray-800 active:scale-[0.98] transition-all font-medium text-base"
          >
            Proceed to Checkout
          </button>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-400">
            <span>🔒 Secure Checkout</span>
            <span>·</span>
            <span>↩ Easy Returns</span>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Cart;
