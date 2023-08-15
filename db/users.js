const client = require("./client");

//Register function
async function register({email, name, password, address}) {
  try {
    const {rows: [user]} = await client.query(`
    INSERT INTO users (email, name, password, address)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (email) DO NOTHING RETURNING id, email;`,
    [email, name, password, address]);
    return user;
  } catch (error) {
    return (error);
  }
}

//Get user by email
async function getUserByEmail(email) {
try {
  const { rows: [users] } = await client.query(
    `
    SELECT id, email FROM users WHERE id=$1;`,[email]);
  return user;
} catch (error) {
  return error;
}
}

// Sign in function
async function signIn (email, password){
  
}