'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const ProductsController = require('./ProductsController');
const ShoppingCart = require('./ShoppingCart');
const products = require('./data/products.json');
const lookup = require('./lookup.json');

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
    return res.status(200).json({ status: lookup[200], data: product });
  } else {
    return res.status(404).json({ status: lookup[404] });
  }
});

app.get('/products', (req, res) =>
  res.status(200).json({
    status: lookup[200],
    data: productsController.getProductCodes(),
  }),
);

app.post('/checkout', (req, res) => {
  const items = req.body.map(x => productsController.getProduct(x));
  const shoppingCart = new ShoppingCart(items);
  return res.json(shoppingCart.checkout());
});

module.exports = app;
