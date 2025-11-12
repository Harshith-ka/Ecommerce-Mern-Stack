import express from "express";
import Cart from "../models/Cart.js";
import auth  from "../middleware/auth.js";

const router = express.Router();

// ✅ Get user cart
router.get("/:userId", auth, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.params.userId })
    .populate("items.productId");

  res.json(cart || { userId: req.params.userId, items: [] });
});

// ✅ Add item to cart
router.post("/add", auth, async (req, res) => {
  const { userId, productId, quantity } = req.body;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({
      userId,
      items: [{ productId, quantity }],
    });
  } else {
    const itemIndex = cart.items.findIndex(
      (i) => i.productId.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
  }

  await cart.save();
  res.json(cart);
});

// ✅ Remove item
router.post("/remove", auth, async (req, res) => {
  const { userId, productId } = req.body;

  const cart = await Cart.findOneAndUpdate(
    { userId },
    { $pull: { items: { productId } } },
    { new: true }
  );

  res.json(cart);
});

// ✅ Clear cart
router.post("/clear", auth, async (req, res) => {
  await Cart.findOneAndDelete({ userId: req.body.userId });
  res.json({ message: "Cart cleared" });
});

export default router;
