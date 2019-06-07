const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const expressHbs = require("express-handlebars");

const { getAllProducts, addOneProduct } = require("./controllers/controllers");
const { MONGODB, SECRET } = require("./config");
const initializeCart = require("./middleware/initializeCart");

const app = express();
app.use(express.json());

const hbs = expressHbs.create({
  // Specify helpers which are only registered on this instance.
  helpers: {
    foo: function() {
      console.log("fooo");
    },
    bar: function() {
      return "BAR!";
    }
  }
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.set("trust proxy", 1);
app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 4 }
  })
);

app.use(initializeCart);

app.get("/add/:id", addOneProduct);
app.get("/", getAllProducts);

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    app.listen(8000, () => console.log("server is listening"));
  })
  .catch(err => {
    console.log(err);
  });
