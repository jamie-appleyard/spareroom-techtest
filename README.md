# SpareRoom Tech Test
- Tech test completed for the position of Foundation Software Developer at SpareRoom, this is a sample backend API with checkout like functionality taking an order object and returning a subTotal for the items in the order with discounts applied where applicable.

## To clone and run this repo locally
- Git clone https://github.com/jamie-appleyard/spareroom-techtest
- Create .env.test file at root level
    - Add PGDATABASE=checkout_test
- See .env-example for an example of .env.test file setup
- Run ```npm install``` in the terminal when in the root directory
- Run ```npm run setup-dbs``` to create database
- By running ```npm test``` this will seed the test database automatically, you will see all tests are currently passing
- You should now be able to interact with the databases using ```psql``` in the terminal if needed
- Run ```npm start``` in the terminal to spin up a local version of the API, you can test making requests to the API by using a tool like insomnia https://insomnia.rest/
- Make a GET request to the /api endpoint to get a json object with an array of available endpoints and usage instructions

### You must have postgres installed on your machine and open to run this repo locally 
- https://postgresapp.com/

## Version requirements
- Node >= 21.5.0
- psql >= 14.10

## Dependencies
- express
- dotenv
- pg
- pg-format