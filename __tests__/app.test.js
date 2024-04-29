const db = require('../db/connection.js')
const request = require('supertest')
const seed = require('../db/seeds/seed.js')
const priceData = require('../db/data/prices.js')
const app = require('../app.js')

//re-seeds the test data before each test
beforeEach(() => seed(priceData))

//ends the connection to the database after the tests have completed
afterAll(() => db.end())

describe('/checkout', () => {
    test('GET 200: returns an integer that is the total of the items in the order with discounts applied on the key of subTotal when passed a valid order array as json', () => {
        const order = [
            { "code": "A", "quantity": 3},
            { "code": "B", "quantity": 3},
            { "code": "C", "quantity": 1},
            { "code": "D", "quantity": 2}
        ]
        return request(app)
        .get('/api/checkout')
        .send(order)
        .expect(200)
        .then((response) => {
            const { subTotal } = response.body
            expect(typeof subTotal).toBe('number')
            expect(subTotal).toBe(284)
        })
    });
    test('GET 200: returns a correct subtotal when only one item is in the order', () => {
        const order = [
            { "code": "A", "quantity": 3}
        ]
        return request(app)
        .get('/api/checkout')
        .send(order)
        .expect(200)
        .then((response) => {
            const { subTotal } = response.body
            expect(typeof subTotal).toBe('number')
            expect(subTotal).toBe(140)
        })
    });
    test('GET 200: returns a correct subtotal with high quantity values and large sub-totals', () => {
        const order = [
            { "code": "A", "quantity": 100},
            { "code": "B", "quantity": 30},
            { "code": "C", "quantity": 20},
            { "code": "D", "quantity": 200}
        ]
        return request(app)
        .get('/api/checkout')
        .send(order)
        .expect(200)
        .then((response) => {
            const { subTotal } = response.body
            expect(typeof subTotal).toBe('number')
            expect(subTotal).toBe(8470)
        })
    });
    test('GET 400: returns an appropriate message and status code when passed items with negative values', () => {
        const order = [
            { "code": "A", "quantity": 3},
            { "code": "B", "quantity": -3},
            { "code": "C", "quantity": 1},
            { "code": "D", "quantity": 2}
        ]
        return request(app)
        .get('/api/checkout')
        .send(order)
        .expect(400)
        .then((response) => {
            expect(response.body.status).toBe(400)
            expect(response.body.msg).toBe('Bad Request')
        })
    });
    test('GET 400: returns an appropriate message and status code when passed order items with item codes that do not exist in the price data', () => {
        const order = [
            { "code": "A", "quantity": 3},
            { "code": "B", "quantity": 3},
            { "code": "C", "quantity": 1},
            { "code": "D", "quantity": 2},
            { "code": "E", "quantity": 2}
        ]
        return request(app)
        .get('/api/checkout')
        .send(order)
        .expect(400)
        .then((response) => {
            expect(response.body.status).toBe(400)
            expect(response.body.msg).toBe('Bad Request')
        })
    });
    test('GET 200: returns 0 on the key of subTotal when passed an empty array', () => {
        const order = []
        return request(app)
        .get('/api/checkout')
        .send(order)
        .expect(200)
        .then((response) => {
            const { subTotal } = response.body
            expect(typeof subTotal).toBe('number')
            expect(subTotal).toBe(0)
        })
    })
    test('GET 400: returns an appropriate message and status code when request contains invalid keys', () => {
        const order = [
            { "item_key": "A", "num": 3},
            { "item_key": "B", "num": 3}
        ]
        return request(app)
        .get('/api/checkout')
        .send(order)
        .expect(400)
        .then((response) => {
            expect(response.body.status).toBe(400)
            expect(response.body.msg).toBe('Bad Request')
        })
    })
    test('GET 400: Returns an appropriate message and status code when SQL injection is attempted', () => {
        const order = [
            {"code": "); DROP DATABASE IF EXISTS checkout_test;", "num": 5}
        ]
        return request(app)
        .get('/api/checkout')
        .send(order)
        .expect(400)
        .then((response) => {
            expect(response.body.status).toBe(400)
            expect(response.body.msg).toBe('Bad Request')
        })
    });
    test('GET 400: Returns an appropriate message and status code when value is missing from key in request object', () => {
        const order = [
            { "item_key": null, "num": 3},
            { "item_key": "B", "num": null}
        ]
        return request(app)
        .get('/api/checkout')
        .send(order)
        .expect(400)
        .then((response) => {
            expect(response.body.status).toBe(400)
            expect(response.body.msg).toBe('Bad Request')
        })
    })
})