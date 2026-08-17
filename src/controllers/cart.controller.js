import CartModel from "../models/cart.model.js";

// add to cart api
const AddToCart = async (req, res) => {
  const { userId, productId, qty = 1 } = req.body;

  try {
    let cart = await CartModel.findOne({ user: userId });

    if (!cart) {
      cart = new CartModel({
        user: userId,
        items: [
          {
            product: productId,
            qty,
          },
        ],
      });
    } else {
      const item = cart.items.find(
        (item) => item.product.toString() === productId,
      );

      if (item) {
        item.qty += qty;
      } else {
        cart.items.push({ product: productId, qty });
      }
    }

    await cart.save();

    return res.status(201).json({
      Msg: "Product added in the cart successfully",
      success: true,
      cart,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Server side error", error, success: false });
  }
};

const GetCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const FindCart = await CartModel.find({ user: userId }).populate(
      "items.product",
    );

    return res
      .status(200)
      .json({ msg: "Fetched carts", carts: FindCart, success: true });
  } catch (error) {
    return res.status(500).json({ msg: "Server side error", error });
  }
};

const RemoveFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    let Cart = await CartModel.findOne({ user: userId });

    if (!Cart) {
      return res.status(404).json({ msg: "Cart not found", success: false });
    }

    Cart.items = Cart.items.filter(
      (item) => item._id.toString() !== productId,
    );

    await Cart.save();

    return res
      .status(200)
      .json({ msg: "Product remove from cart", success: true });
  } catch (error) {
    return res.status(500).json({ msg: "Server side error", error });
  }
};

const UpdateProduct = async (req, res) => {
  const { userId, productId, qty } = req.body;

  try {
    const Cart = await CartModel.findOne({ user: userId });

    if (!Cart) {
      return res.status(404).json({ msg: "Cart not found", success: false });
    }

    const item = Cart.items.find(
      (item) => item.product.toString() === productId,
    );

    item.qty = qty;

    await Cart.save();

    return res
      .status(200)
      .json({ msg: "Cart update successfully", success: true });
  } catch (error) {
    return res.status(500).json({ msg: "Server side error", success: false });
  }
};

export default { AddToCart, GetCart, RemoveFromCart, UpdateProduct };
