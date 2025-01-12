import { Product } from "../models/products.js";
import express from "express";
const router = express.Router();
const mongoose = require("mongoose");

router.get('/', async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({message: "No query found" });
    }
    
    
      const items = await Product.find({
        $or: [
          { name: { $regex: query, $options: "i" } },
          { brand: { $regex: query, $options: "i" } }
        ]
      });


    res.json(items);
  } catch (error) {
    res.status(500).json({  error: error.message });
  }
});

module.exports = router;