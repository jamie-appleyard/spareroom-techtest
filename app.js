const express = require('express')
const app = express()

const {
    getEndpoints,
    getSubTotal
} = require('./controllers/checkout_controllers.js')

app.use(express.json())

//Returns an object containing information on available endpoints
app.get('/api', getEndpoints)

//Returns a subtotal for items in the request body applying any relevant discounts before returning
app.get('/api/checkout', getSubTotal)

//Catch errors that contain a status and a message and return to the user
app.use((err, request, response, next) => {
    if (err.status && err.msg) {
        response.status(err.status).send({status: err.status, msg: err.msg})
    }
    next(err)
})

//500 error

module.exports = app