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

const mockReq = { items: ['CHAIR_RED', 'DIS_10-CHAIR_BLUE'] };
const mockReqNotFound = { items: ['CHAIR_RED', 'FAKEY'] };
const mockReqInvalid = ['CHAIR_RED', 'DIS_10-CHAIR_BLUE'];

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

  describe('/checkout', () => {
    it('return total price after discount and loyalty points', async () => {
      const response = await request(app)
        .post('/checkout')
        .send(mockReq);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        status: lookup[200],
        data: {
          totalPrice: 47.5,
          loyaltyPoints: 7.5,
        },
      });
    });
    it('Return 404 when data cannot be found', async () => {
      const response = await request(app)
        .post('/checkout')
        .send(mockReqNotFound);
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({
        status: lookup[404],
      });
    });
    it('Return 400 when request params is missing or invalid', async () => {
      const response = await request(app)
        .post('/checkout')
        .send(mockReqInvalid);
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        status: lookup[400],
      });
    });
  });
});
