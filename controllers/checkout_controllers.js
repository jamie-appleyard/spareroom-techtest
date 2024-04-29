const api_endpoints = require('../endpoints.json')

const {
    selectPricesByItemCode
} = require('../models/checkout_models.js')

const {
    calculateSubTotal
} = require("./utils.js")

//Returns a JSON object with the endpoints available and a description of the endpoints usage
const getEndpoints = (req, res, next) => {
    const endpoints = api_endpoints
    res.status(200).send({endpoints: endpoints})
}

//Takes an order JSON object in the request and returns the sub total of the items in the order with discounts applied where applicable
const getSubTotal = (req, res, next) => {
    const order = req.body
    selectPricesByItemCode(order).then((prices) => {
        const subTotal = calculateSubTotal(order, prices)
        res.status(200).send({ subTotal })
    }).catch((err) => {
        next(err)
    })
}

module.exports = {
    getEndpoints,
    getSubTotal
}