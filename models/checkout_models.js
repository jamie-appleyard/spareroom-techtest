const db = require('../db/connection.js')
const format = require('pg-format')

const selectPricesByItemCode = (order) => {
    //Check if order has length 0 and return empty array
    if (order.length === 0) {
        return Promise.resolve([])
    }
    //Check for negative values of quantity and return error
    if (order.filter(item => item.quantity < 0).length >= 1) {
        return Promise.reject({status: 400, msg:'Bad Request'})
    }
    const queryString = format(`SELECT * FROM prices WHERE item_code IN (%L);`,
    order.map((item) => item.code))
    return db.query(queryString).then((data) => {
        const { rows } = data
        //Check all items in order exist in price database or return error
        if (rows.length === order.length) {
            return rows
        }
        return Promise.reject({status: 400, msg:'Bad Request'})
    })
}

module.exports = {selectPricesByItemCode}