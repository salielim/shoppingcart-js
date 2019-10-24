class ProductsController {
  constructor(products) {
    this.products = products;
  }

  getProductCodes() {
    // return this.products.map(product => product.productCode);
    return this.products;
  }

  getProduct(productCode) {
    return this.products.find(product => product.productCode === productCode);
  }
}

module.exports = ProductsController;
