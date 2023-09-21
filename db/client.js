require("dotenv").config();
const { user, host, database, password, port } = process.env;
//set up DB for queries
const { Pool } = require("pg");

const client = new Pool({
  user: user,
  host: host,
  database: database,
  password: password,
  port: port,
});

module.exports = client;