const priceData = require('../data/prices.js');
const seed = require('./seed.js');
const db = require('../connection.js');

//runSeed invokes the seed function creating the prices table and inserting the price data, passing in the imported price data as an argument and then ends the connection to the database
const runSeed = () => {
    return seed(priceData).then(() => db.end());
};

runSeed();