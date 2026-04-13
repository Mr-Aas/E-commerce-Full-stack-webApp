// controllers/cartController.js
import Cart from "../models/Cart.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, price, quantity } = req.body;
    const userId = req.user.id;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [], totalPrice: 0 });
    }

    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      // already exists → increase quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity, price });
    }

    // recalculate total
    cart.totalPrice = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    await cart.save();

    res.json(cart);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};