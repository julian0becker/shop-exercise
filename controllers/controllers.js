const Product = require("../models/product");

async function getAllProducts(req, res) {
  const products = await Product.find();
  res.render("home", { products: products });
}

async function addOneProduct(req, res, next) {
  const { id } = req.params;
  try {
    const product = await Product.findOne({ _id: id });
    req.session.cart.add(product);
    console.log(req.session.cart);
  } catch (error) {
    console.error(error);
  }
  res.redirect("/");
}

module.exports = {
  getAllProducts,
  addOneProduct
};
