const Product = require("../models/product");

async function getAllProducts(req, res) {
  const products = await Product.find();
  res.json(products);
  console.log(req.session);
}

module.exports = {
  getAllProducts
};
