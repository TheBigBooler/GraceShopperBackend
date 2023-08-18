const client = require("./client");

console.log("seed running");

const dropTables = async () => {
    try {
  console.log("Dropping tables...");

  await client.query(`
  DROP TABLE IF EXISTS admins;
  DROP TABLE IF EXISTS reviews;
  DROP TABLE IF EXISTS order_products;
  DROP TABLE IF EXISTS orders;
  DROP TABLE IF EXISTS cart;
  DROP TABLE IF EXISTS products;
  DROP TABLE IF EXISTS users;
  `);

console.log("Finished dropping tables")

 } catch (error) {
  console.error("Error dropping tables!");
 }
}


const createTables = async () => {
    try {
        console.log("Building tables...")

        await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            name VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL
        );
        CREATE TABLE products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE,
            category VARCHAR(255),
            description TEXT,
            image VARCHAR(255),
            price INTEGER,
            inventory INTEGER,
            active BOOLEAN DEFAULT true
        );
        CREATE TABLE cart (
            id SERIAL PRIMARY KEY,
            "addedBy" INTEGER REFERENCES users(id),
            "productId" INTEGER REFERENCES products(id),
            quantity INTEGER
        );
        CREATE TABLE orders (
            id SERIAL PRIMARY KEY,
            status VARCHAR(255) DEFAULT 'pending',
            "purchasedBy" INTEGER REFERENCES users(id),
            "orderDate" TIMESTAMPTZ DEFAULT current_timestamp
        );
        CREATE TABLE order_products (
            id SERIAL PRIMARY KEY,
            "orderId" INTEGER REFERENCES orders(id),
            "productId" INTEGER REFERENCES products(id),
            price INTEGER
        );
        CREATE TABLE reviews (
            id SERIAL PRIMARY KEY,
            reviewer INTEGER REFERENCES users(id),
            "orderId" INTEGER REFERENCES orders(id),
            "productId" INTEGER REFERENCES products(id),
            description TEXT
        );
        CREATE TABLE admins (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        )
        `);
           

        console.log("Finished building tables!")
    } catch (error) {
        console.error("Error building tables")
        console.log(error)
    }
}

//reseed database with dummy data
const {createInitialUsers, createInitialProducts, createInitialOrders } = require('./createData')

const rebuildDB = async () => {
    try {
        await dropTables();
        await createTables();
        await createInitialUsers();
        await createInitialProducts();
        await createInitialOrders();
    } catch (error) {
        console.error("Error during rebuild")
        console.log(error)
    } finally {
        client.end()
    }
}

rebuildDB()