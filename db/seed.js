const client = require("./client");

console.log("seed running");

const dropTables = async () => {
    try {
  console.log("Dropping tables...");

  await client.query(`
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
            password VARCHAR(255) NOT NULL
        );`)

        console.log("Finished building tables!")
    } catch (error) {
        console.error("Error building tables")
    }
}

const rebuildDB = async () => {
    try {
        await dropTables();
        await createTables();
    } catch (error) {
        console.error("Error during rebuild")
        throw error
    } finally {
        client.end()
    }
}

rebuildDB()