require("dotenv").config();
const CONNECTION_STRING = process.env;

const { Pool } = require("pg");

const client = new Pool({
  CONNECTION_STRING
});

module.exports = client;