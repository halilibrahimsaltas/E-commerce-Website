const Cart = require("../models/cart");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
router.get("/", async (req, res) => {
  try {
    const cartList = await Cart.find();

    if (!cartList) {
      return res.status(404).json({ success: false, message: "Cart is empty." });
    }

    // Calculate total price
    const totalPrice = cartList.reduce((acc, item) => acc + item.subTotal, 0);

    res.status(200).json({ success: true, cart: cartList, totalPrice });
  } catch (error) {
    console.error("Error fetching cart:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post(`/add`, async (req, res) => {
    const cartItem = await Cart.findByIdAndDelete(req.params.id);
    
    let cartList = new Cart({
    productTitle: req.body.productTitle,
    image: req.body.image,
    price: req.body.price,
    quantity: req.body.quantity,
    subTotal: req.body.subTotal,
    ProductId: req.body.productId,
    userId: req.body.userId,
  });

  try {
    if (!cartList) {
      res.status(500).json({ success: false });
    } else {
      cartList = await cartList.save();
      res.status(201).json(cartList);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    // Update the cart item by ID
    const cartList = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        productTitle: req.body.productTitle,
        image: req.body.image,
        price: req.body.price,
        quantity: req.body.quantity, // Fixed typo
        subTotal: req.body.subTotal,
        ProductId: req.body.productId,
        userId: req.body.userId,
      },
      { new: true } // Ensure the updated document is returned
    );

    // If no document is found, return a 404 error
    if (!cartList) {
      return res.status(404).json({ success: false, message: "Cart item not found." });
    }

    // Return the updated document on success
    res.status(200).json({ success: true, data: cartList });
  } catch (error) {
    // Catch and log any errors, then return a 500 response
    console.error("Error updating cart:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const cartItem = await Cart.findByIdAndDelete(req.params.id);

  try {
    if (cartItem) {
      return res
        .status(200)
        .json({ success: true, message: "The Item is deleted!" });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Item not found!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
});
module.exports = router;
