const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const { getAllProducts } = require("./controllers/controllers");
const { MONGODB, SECRET } = require("./config");

const app = express();
app.use(express.json());
app.set("trust proxy", 1);
app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true, maxAge: 1000 * 60 * 60 * 4 }
  })
);

app.get("/", getAllProducts);

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    app.listen(8000, () => console.log("server is listening"));
  })
  .catch(err => {
    console.log(err);
  });
