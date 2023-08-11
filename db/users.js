const client = require("./client");

//Register function
async function register({email, name, password }) {
  try {
    const {rows: [user]} = await client.query(`
    INSERT INTO users (email, name, password)
    VALUES ($1, $2, $3)
    ON CONFLICT (email) DO NOTHING RETURNING id, email;`,
    [email, name, password]);
    return user;
  } catch (error) {
    return (error);
  }
}
