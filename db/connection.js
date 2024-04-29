//Pool allows for connection to a postgres DB
const { Pool } = require('pg');

//Get the database name from the .env.test file
require('dotenv').config({
    path: `${__dirname}/../.env.test`
});

const config = {};

module.exports = new Pool(config);