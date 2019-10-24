# ShoppingCart

## Salie's Notes

### API Documentation

Refer to `https://documenter.getpostman.com/view/4973864/SVzuchD8`

### Postman Collection

Refer to `ShoppingCartJS.postman_collection.json`

### Refactored

- Added Nodemon
- Standard JSON API response for consistency, used JSend format
- Lookup table for errors and success status codes
- ES6 syntax
- Class constructors
- 100% Jest test coverage

### Implemented Features

- Validations for POST /checkout

  - 400 for missing/invalid request parameters
  - 404 for item not found

- Calculations for discount and price before discount

  - this logic to be done on backend instead of frontend for consistency

- Calculations for \$20 discount when checking out table and chair set
  - assume specific colour and material set
  - assume no change to loyalty points

### Story Wall To-Do

- 20% discount for plastic chairs
- 10% discount on orders more than \$1000

## Problem background

We have an existing shopping cart application, with a small set of eCommerce/shopping cart rules.
Rules include calculation of total price, discount and loyalty points calculation.
Most of the business logic is implemented in single method `ShoppingCart.checkout`.
There is a `/products` endpoint to list the products.

## Prerequisites

- [Node](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/en/)

## IDE Setup

We recommend using a lightweight IDE like

- [Sublime](https://www.sublimetext.com/3)
- [Atom](https://atom.io/)

and running the tests in the terminal.

## Testing

In your terminal run `yarn install` to install all requirements.
Run `yarn test` to run all the tests.

### Running the Application

In your terminal run `yarn install` to install all requirements.
Run `yarn start` to start the application on port `8080`. Then naviate to `http://localhost:8080/products` to check the app is running.
