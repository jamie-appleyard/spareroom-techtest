const {
    calculateSubTotal,
    convertSpecialPriceString
} = require('../controllers/utils.js')

describe("convertSpecialPriceString", () => {
    test("takes a string of the format '3 for 140' and converts it to an object of the format {quantity: 3, price: 140}", () => {
        const inputString = '3 for 140'
        const expected = {quantity: 3, price: 140}
        expect(convertSpecialPriceString(inputString)).toEqual(expected)
    });
    test("Returns false if the string argument is not of the format '3 for 140'", () => {
        const inputString = 'buy 1 get 1 free'
        const expected = false
        expect(convertSpecialPriceString(inputString)).toBe(expected)
    })
})

describe("calculateSubTotal", () => {
    test('Takes an order array and a price list array and returns a total cost for the order', () => {
        const order = [
            { "code": "A", "quantity": 3},
            { "code": "B", "quantity": 3},
            { "code": "C", "quantity": 1},
            { "code": "D", "quantity": 2}
        ]
        const prices = [
        { item_code: 'A', unit_price: 50, special_price: '3 for 140' },
        { item_code: 'B', unit_price: 35, special_price: '2 for 60' },
        { item_code: 'C', unit_price: 25, special_price: null },
        { item_code: 'D', unit_price: 12, special_price: null }
      ]
      expected = 284
      expect(calculateSubTotal(order, prices)).toBe(expected)
    })
    test('Works with one order item', () => {
        const order = [
            { "code": "A", "quantity": 3}
        ]
        const prices = [
        { item_code: 'A', unit_price: 50, special_price: '3 for 140' }
        ]
        expected = 140
        expect(calculateSubTotal(order, prices)).toBe(expected)
    })
    test('No discount is applied when below the discount quantity threshold for items that have a discount', () => {
        const order = [
            { "code": "A", "quantity": 2}
        ]
        const prices = [
        { item_code: 'A', unit_price: 50, special_price: '3 for 140' }
        ]
        expected = 100
        expect(calculateSubTotal(order, prices)).toBe(expected)
    })
    test('Works with high order quantities and applies the correct discounting where the discount would apply more than once', () => {
        const order = [
            { "code": "A", "quantity": 11}
        ]
        const prices = [
        { item_code: 'A', unit_price: 50, special_price: '3 for 140' }
      ]
      expected = 520
      expect(calculateSubTotal(order, prices)).toBe(expected)
    })
    test('If order or price argument is missing, function returns false', () => {
        const order = [
            { "code": "A", "quantity": 3},
            { "code": "B", "quantity": 3},
            { "code": "C", "quantity": 1},
            { "code": "D", "quantity": 2}
        ]
        expected = false
        expect(calculateSubTotal(order)).toBe(expected)
    })
    test('If order or price argument are not arrays, function returns false', () => {
        const order = [
            { "code": "A", "quantity": 3},
            { "code": "B", "quantity": 3},
            { "code": "C", "quantity": 1},
            { "code": "D", "quantity": 2}
        ]
        expected = false
        expect(calculateSubTotal(order)).toBe(expected)
    })
    test('If order has length 0, returns subtotal of 0', () => {
        const order = []
        const prices = [
            { item_code: 'A', unit_price: 50, special_price: '3 for 140' },
            { item_code: 'B', unit_price: 35, special_price: '2 for 60' },
            { item_code: 'C', unit_price: 25, special_price: null },
            { item_code: 'D', unit_price: 12, special_price: null }
        ]
        expect(calculateSubTotal(order, prices)).toBe(0)
    })
    test('Does not mutate the input arrays', () => {
        const order = [
            { "code": "A", "quantity": 3},
            { "code": "B", "quantity": 3},
            { "code": "C", "quantity": 1},
            { "code": "D", "quantity": 2}
        ]
        const prices = [
            { item_code: 'A', unit_price: 50, special_price: '3 for 140' },
            { item_code: 'B', unit_price: 35, special_price: '2 for 60' },
            { item_code: 'C', unit_price: 25, special_price: null },
            { item_code: 'D', unit_price: 12, special_price: null }
        ]
        calculateSubTotal(order, prices)
        expect(order).toEqual([
            { "code": "A", "quantity": 3},
            { "code": "B", "quantity": 3},
            { "code": "C", "quantity": 1},
            { "code": "D", "quantity": 2}
        ])
        expect(prices).toEqual([
            { item_code: 'A', unit_price: 50, special_price: '3 for 140' },
            { item_code: 'B', unit_price: 35, special_price: '2 for 60' },
            { item_code: 'C', unit_price: 25, special_price: null },
            { item_code: 'D', unit_price: 12, special_price: null }
        ])
    })
})