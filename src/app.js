'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const ProductsController = require('./ProductsController');
const products = require('./data/products.json');
const ShoppingCart = require('./ShoppingCart.js');

const app = express();
const productsController = new ProductsController(products);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.get('/products/:code', (req, res) => {
  const product = productsController.getProduct(req.params.code);
  if (product) {
    return res.json(product);
  } else {
    return res.sendStatus(404);
  }
});

app.get('/products', (req, res) =>
  res.json(productsController.getProductCodes()),
);

app.post('/checkout', (req, res) => {
  const items = req.body.map(x => productsController.getProduct(x));
  const shoppingCart = new ShoppingCart(items);
  return res.json(shoppingCart.checkout());
});

module.exports = app;
