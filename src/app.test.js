const request = require('supertest');
const app = require('./app');
const lookup = require('./lookup.json');

// mock out data file
jest.mock(
  './data/products.json',
  () => [
    {
      price: 25,
      productCode: 'CHAIR_RED',
      name: 'Red plastic chair',
    },
    {
      price: 25,
      productCode: 'DIS_10-CHAIR_BLUE',
      name: 'Blue plastic chair',
    },
  ],
  { virtual: true },
);

const mockRes = [
  {
    price: 25,
    productCode: 'CHAIR_RED',
    name: 'Red plastic chair',
  },
  {
    price: 25,
    productCode: 'DIS_10-CHAIR_BLUE',
    name: 'Blue plastic chair',
  },
];

describe('App', () => {
  describe('/products', () => {
    it('return all products', async () => {
      const response = await request(app).get('/products');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        status: lookup[200],
        data: mockRes,
      });
    });
  });

  describe('/products/<PRODUCT_CODE>', () => {
    it('Return data for RED CHAIR', async () => {
      const response = await request(app).get('/products/CHAIR_RED');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        status: lookup[200],
        data: {
          price: 25,
          productCode: 'CHAIR_RED',
          name: 'Red plastic chair',
        },
      });
    });

    it('Return 404 when data cannot be found', async () => {
      const response = await request(app).get('/products/FAKEY_PRODUC_CODE');
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({
        status: lookup[404],
      });
    });
  });
});
