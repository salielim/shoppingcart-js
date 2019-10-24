'use strict';

/**
* Calculates total price and total loyalty points earned by the customer.
* Products with product code starting with DIS_10 have a 10% discount applied.
* Products with product code starting with DIS_15 have a 15% discount applied.
* Loyalty points are earned more when the product is not under any offer.
    - Customer earns 1 point on every $5 purchase.
    - Customer earns 1 point on every $10 spent on a product with 10% discount.
    - Customer earns 1 point on every $15 spent on a product with 15% discount.
*/

class CheckoutController {
  constructor(items) {
    this.items = items;
  }

  checkout() {
    let totalPriceBefDisc = 0;
    let totalPriceAftDisc = 0;
    let totalDiscount = 0;
    let loyaltyPoints = 0;

    this.items.forEach(item => {
      totalPriceBefDisc += item.price;
      if (item.productCode.startsWith('DIS_10')) {
        totalDiscount += item.price * 0.1;
        loyaltyPoints += item.price / 10;
      } else if (item.productCode.startsWith('DIS_15')) {
        totalDiscount += item.price * 0.15;
        loyaltyPoints += item.price / 15;
      } else {
        loyaltyPoints += item.price / 5;
      }
      totalPriceAftDisc = totalPriceBefDisc - totalDiscount;
    });

    // $20 discount for table and chair package
    const chairs = this.items.filter(item =>
      item.productCode.includes('CHAIR'),
    );
    const tables = this.items.filter(item =>
      item.productCode.includes('TABLE'),
    );
    const sets = this.items.filter(item => item.set);

    if (
      tables &&
      tables.length &&
      chairs &&
      chairs.length &&
      sets &&
      sets.length > 1
    ) {
      totalPriceAftDisc -= 20;
      totalDiscount += 20;
    }

    return {
      totalPriceBefDisc,
      totalPriceAftDisc,
      totalDiscount,
      loyaltyPoints,
      items: this.items,
    };
  }
}

module.exports = CheckoutController;
