const ShoppingCart = require('./shoppingCart');

const CHAIR_RED = {
  price: 25, // 5 pts
  productCode: 'CHAIR_RED',
  name: 'Red plastic chair',
  set: 'RED_PLASTIC',
};

const CHAIR_BLUE = {
  price: 25, // 2.5pts, 22.5 after disc
  productCode: 'DIS_10-CHAIR_BLUE',
  name: 'Blue plastic chair',
};

const CHAIR_GREEN = {
  price: 25, // 1.6pts, 21.25 after disc
  productCode: 'DIS_15-CHAIR_GREEN',
  name: 'Blue plastic chair',
};

const TABLE_RED = {
  price: 50, // 10 pts
  productCode: 'TABLE_RED',
  name: 'Red plastic table',
  set: 'RED_PLASTIC',
};

const exampleProducts = [CHAIR_RED, CHAIR_BLUE, CHAIR_GREEN, TABLE_RED];

describe('ShoppingCart', () => {
  let shoppingCart;

  beforeEach(() => {
    shoppingCart = new ShoppingCart(exampleProducts);
  });

  describe('checkout', () => {
    it('should return total price before discount', () => {
      const totalPrice = shoppingCart.checkout().totalPriceBefDisc;
      expect(totalPrice).toEqual(125);
    });
    it('should return total price after discounts of DIS_10, DIS_15', () => {
      const totalPrice = shoppingCart.checkout().totalPriceAftDisc;
      expect(totalPrice).toEqual(118.75);
    });
    it('should return total loyalty points', () => {
      const loyaltyPoints = shoppingCart.checkout().loyaltyPoints;
      expect(+loyaltyPoints.toFixed(2)).toEqual(19.17);
    });
    it('should return total discount', () => {
      const totalDiscount = shoppingCart.checkout().totalDiscount;
      expect(totalDiscount).toEqual(6.25);
    });
  });
});
