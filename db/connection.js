const { Pool } = require('pg');

require('dotenv').config({
    path: `${__dirname}/../.env.test`
});

const config = {};

module.exports = new Pool(config);