require("dotenv").config();
const { user, host, database, password, port } = process.env;

const { Pool } = require("pg");

const client = new Pool({
  user: user,
  host: host,
  database: database,
  password: password,
  port: port,
});

module.exports = client;