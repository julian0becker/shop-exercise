const Cart = require("../models/Cart");

module.exports = function initializeCart(req, res, next) {
  req.session.cart = new Cart(req.session.cart);
  next();
};
