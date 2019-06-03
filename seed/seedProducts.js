const faker = require("faker");
const mongoose = require("mongoose");
const { MONGODB } = require("../config.js");
const Product = require("../models/product");

let products = [];
for (let i = 0; i < 20; i++) {
  let product = {
    name: faker.commerce.productName(),
    description: faker.lorem.sentence(),
    imgUrl: faker.image.imageUrl(),
    price: faker.commerce.price()
  };
  products.push(product);
}

mongoose.connect(MONGODB, { useNewUrlParser: true });

Product.insertMany(products)
  .then(data => {
    if (data) {
      mongoose.connection.close();
    }
  })
  .catch(err => console.log(err));
