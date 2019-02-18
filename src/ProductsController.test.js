const ProductsController = require('./productsController');

const CHAIR_RED = {
  price: 24.99,
  productCode: 'CHAIR_RED',
  name: 'Red plastic chair',
};

const CHAIR_BLUE = {
  price: 24.99,
  productCode: 'DIS_10-CHAIR_BLUE',
  name: 'Blue plastic chair',
};

const exampleProducts = [CHAIR_RED, CHAIR_BLUE];

describe('ProductsController', () => {
  let productsController;

  beforeEach(() => {
    productsController = new ProductsController(exampleProducts);
  });

  describe('getProductCodes', () => {
    it('should return all codes', () => {
      const codes = productsController.getProductCodes();
      expect(codes.length).toBe(2);
      expect(codes).toContain(CHAIR_RED.productCode);
      expect(codes).toContain(CHAIR_BLUE.productCode);
    });
  });

  describe('getProduct', () => {
    it('should return product for known code', () => {
      const product = productsController.getProduct(CHAIR_RED.productCode);
      expect(product).toEqual(CHAIR_RED);
    });
    it('should return undefined for non-existent product', () => {
      const product = productsController.getProduct('NONSENSE_CODE');
      expect(product).toEqual(undefined);
    });
  });
});
