# ShoppingCart

### Problem background

We have an existing shopping cart application, with a small set of eCommerce/shopping cart rules.
Rules include calculation of total price, discount and loyalty points calculation.
Most of the business logic is implemented in single method `ShoppingCart.checkout`.
There is a `/products` endpoint to list the products.

## Prerequisites

* [Node](https://nodejs.org/en/)
* [Yarn](https://yarnpkg.com/en/)

## IDE Setup

We recommend using a lightweight IDE like 

* [Sublime](https://www.sublimetext.com/3)
* [Atom](https://atom.io/) 

and running the tests in the terminal.

## Testing

In your terminal run `yarn install` to install all requirements.
Run `yarn test` to run all the tests.

### Running the Application

In your terminal run `yarn install` to install all requirements.
Run `yarn start` to start the application on port `8080`. Then naviate to `http://localhost:8080/products` to check the app is running.
