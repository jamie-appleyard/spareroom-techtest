const express = require('express')
const app = express()

const {
    testEndpoint
} = require('./controllers/checkout_controllers.js')

app.use(express.json())

//Base endpoint
app.get('/api', testEndpoint)

module.exports = app