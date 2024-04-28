const format = require('pg-format');
const db = require("../connection.js");

//Executes a query in the database to create the prices table and returns a promise
const createPricesTable = () => {
    return db.query(`
        CREATE TABLE prices (
            item_code VARCHAR PRIMARY KEY,
            unit_price INT DEFAULT 0 NOT NULL,
            special_price VARCHAR
        );`)
}

//Executes a query in the databse to insert the data from priceData in to the price table and returns a promise
const insertPriceDataIntoPriceTable = (priceData) => {
    const insertPricesQueryStr = format(
        'INSERT INTO prices (item_code, unit_price, special_price) VALUES %L;',
        priceData.map(({item_code, unit_price, special_price}) => [item_code, unit_price, special_price])
    );
    return db.query(insertPricesQueryStr)
}

//Seed function removes the prices table if it exists, creates the price table, insert price data in to that table.
const seed = (priceData) => {
    return db
    .query(`DROP TABLE IF EXISTS prices;`)
    .then(() => {
        return createPricesTable()
    })
    .then(() => {
        return insertPriceDataIntoPriceTable(priceData)
    });
};

module.exports = seed;