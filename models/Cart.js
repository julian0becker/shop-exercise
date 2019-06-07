module.exports = class Cart {
  constructor(cart) {
    if (cart) {
      this.items = cart.items;
    } else {
      this.items = {};
    }
  }
  get totalQty() {
    let qty = 0;
    for (let item in this.items) {
      qty += this.items[item].qty;
    }
    return qty;
  }

  get totalPrice() {
    let price = 0;
    for (let item in this.items) {
      price += this.items[item].price;
    }
    return price;
  }

  add(product) {
    if (this.items.hasOwnProperty(product._id)) {
      const item = this.items[product._id];
      item.qty++;
      item.price = item.qty * product.price;
    } else {
      this.items[product._id] = {
        productDetails: product,
        qty: 1,
        price: product.price
      };
    }
  }

  remove(product) {
    const item = this.items[product._id];
    if (item.qty > 1) {
      item.qty--;
      item.price = item.qty * product.price;
    }
  }

  removeAll() {
    this.items = {};
  }
};
