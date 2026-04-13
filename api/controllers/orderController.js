// controllers/ordersController.js

import Order from "../models/Orders.js";
import Product from "../models/product.js";


// ==============================
// 📦 CREATE ORDER
// ==============================
export const createOrder = async (req, res) => {
  try {
    console.log("➡️ Creating new order...");

    const { items, shippingAddress, paymentMethod } = req.body;
    const userId = req.user?.id;

    if (!items || items.length === 0) {
      console.log("❌ Cart is empty");
      return res.status(400).json({ message: "Cart is empty" });
    }

    let subtotal = 0;

    // 🔍 Validate + snapshot products
    const updatedItems = await Promise.all(
      items.map(async (item) => {
        console.log(`🔍 Checking product: ${item.productId}`);

        const product = await Product.findById(item.productId);

        if (!product) throw new Error("Product not found");

        if (product.stock < item.quantity) {
          throw new Error(`${product.name} is out of stock`);
        }

        const itemTotal = product.price * item.quantity;
        subtotal += itemTotal;

        return {
          productId: product._id,
          name: product.name,
          image: product.images?.[0],
          price: product.price,
          quantity: item.quantity,
        };
      })
    );

    // 💰 Pricing
    const shipping = subtotal > 500 ? 0 : 50;
    const tax = 0;
    const total = subtotal + shipping + tax;

    console.log("💰 Pricing:", { subtotal, shipping, tax, total });

    // 📦 Create Order
    const order = await Order.create({
      userId,
      items: updatedItems,
      shippingAddress,

      pricing: {
        subtotal,
        shipping,
        tax,
        total,
      },

      paymentMethod,

      orderStatus: "PLACED", // ✅ IMPORTANT
    });

    console.log("✅ Order created:", order._id);

    res.status(201).json(order);

  } catch (error) {
    console.error("❌ CREATE ORDER ERROR:", error);
    res.status(500).json({
      message: error.message || "Failed to create order",
    });
  }
};



// ==============================
// 📦 GET ALL PENDING ORDERS
// ==============================
export const getOrders = async (req, res) => {
  try {
    console.log("➡️ Fetching pending orders...");

    const orders = await Order.find({ orderStatus: "PLACED" })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    console.log(`✅ Found ${orders.length} pending orders`);

    res.status(200).json(orders);

  } catch (error) {
    console.error("❌ GET ORDERS ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};



// ==============================
// 📊 GET SALES (DELIVERED)
// ==============================
export const getSales = async (req, res) => {
  try {
    console.log("➡️ Fetching sales data...");

    const sales = await Order.find({ orderStatus: "DELIVERED" })
      .populate("userId", "name email")
      .sort({ deliveredAt: -1 });

    console.log(`✅ Found ${sales.length} completed sales`);

    res.status(200).json(sales);

  } catch (error) {
    console.error("❌ GET SALES ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch sales",
      error: error.message,
    });
  }
};



// ==============================
// 🚚 MARK ORDER AS DELIVERED
// ==============================
export const markAsDelivered = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body)

    console.log(`➡️ Delivering order: ${id}`);

    const order = await Order.findById(id);

    if (!order) {
      console.log("❌ Order not found");
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus = "DELIVERED";
    order.deliveredAt = new Date();
    order.isPaid = true;
    order.paymentStatus = "PAID";

    await order.save();

    console.log("✅ Order marked as delivered");

    res.status(200).json(order);

  } catch (error) {
    console.error("❌ DELIVERY ERROR:", error);
    res.status(500).json({
      message: "Failed to update order",
      error: error.message,
    });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error("MY ORDERS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};



// ==============================
// ❌ CANCEL ORDER
// ==============================
export const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(`➡️ Cancelling order: ${id}`);

    const order = await Order.findById(id);

    if (!order) {
      console.log("❌ Order not found");
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus = "CANCELLED";

    await order.save();

    console.log("✅ Order cancelled");

    res.status(200).json(order);

  } catch (error) {
    console.error("❌ CANCEL ERROR:", error);
    res.status(500).json({
      message: "Failed to cancel order",
      error: error.message,
    });
  }
};