const { Product } = require("../models/products");
const express = require("express");
const router = express.Router();
const { Category } = require("../models/category");

// Get all products
router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 10;
  const totalPosts = await Product.countDocuments();
  const totalPages = Math.ceil(totalPosts / perPage);

  if (page > totalPages) {
    return res.status(404).json({ message: "Page not found" });
  }

  // Set up filter criteria
  const filter = {};

  if (req.query.name) {
    filter.name = { $regex: `.*${req.query.name}.*`, $options: "i" };
  } 
  
  if (req.query.category) {
    filter.category = { $in: req.query.category.split(",") };  // Support multiple categories
  }


  if (req.query.minPrice && req.query.maxPrice) {
    filter.price = { $gte: req.query.minPrice, $lte: req.query.maxPrice };
  }

  if (req.query.brand) {
    filter.brand = { $in: req.query.brand.split(",") };  // Support multiple brands
  }

  try {
    const productList = await Product.find(filter)
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    return res.status(200).json({
      products: productList,
      totalPages: totalPages,
      page: page,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error fetching products", error });
  }
});

router.get("/filters", async (req, res) => {
  try {
    const brands = await Product.distinct("brand"); // Benzersiz markalar
    const categories = await Product.distinct("category"); // Benzersiz kategoriler

    return res.status(200).json({ brands, categories });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error fetching filters", error });
  }
});

router.get("/featured", async (req, res) => {
  try {
      const productList = await Product.find({ isFeatured: true });

      if (!productList || productList.length === 0) {
          return res.status(404).json({ success: false, message: "No featured products found" });
      }

      return res.status(200).json(productList); // Send the array of featured products
  } catch (error) {
      console.error("Error fetching featured products:", error);
      return res.status(500).json({ success: false, message: "An error occurred", error: error.message });
  }
});
router.get("/search", async (req, res) => {
  const { search } = req.query;
  const filters = {};

  if (search) {
    filters.$or = [
      { name: { $regex: `.*${search}.*`, $options: "i" } },
      { brand: { $regex: `.*${search}.*`, $options: "i" } },
    ];
  }

  try {
    const products = await Product.find(filters);
    res.status(200).json({ products });
  } catch (error) {
    console.error("Error in /search route:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});



// Get single product
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category");
  if (!product) {
    return res.status(500).json({ success: false });
  }
  res.send(product);
});
// Create a new product
router.post("/create", async (req, res) => {
  const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send("Invalid Category");
    let product = new Product({
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      images: req.body.images,
      brand: req.body.brand,
      price: req.body.price,
      oldPrice:req.body.oldPrice,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      isFeatured: req.body.isFeatured,
    });
    product = await product.save();
    if (!product) return res.status(500).send("The product cannot be created");
    res.send(product);
}   );  

// Update a product
router.put("/:id", async (req, res) => {
  const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send("Invalid Category");
    const product = await Product.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        images: req.body.images,
        brand: req.body.brand,
        price: req.body.price,
        oldPrice:req.body.oldPrice,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        isFeatured: req.body.isFeatured,
        }, { new: true });
    if (!product) return res.status(500).send("the product cannot be updated!");
    res.send(product);
}
);
// Delete a product
router.delete("/:id", (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then((product) => {
      if (product) {
        return res
          .status(200)
          .json({ success: true, message: "the product is deleted!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "product not found!" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});






module.exports = router;