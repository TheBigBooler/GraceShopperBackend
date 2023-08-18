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
  const { rows: [user] } = await client.query(
    `
    SELECT id, email, password FROM users WHERE email=$1;`,[email]);
  return user;
} catch (error) {
  return error;
}
}

//find user trying to login
const getUser = async ({ email, password }) => {
    try {
        const {
          rows: [verifyUser],
        } = await client.query(
          `
    SELECT id, email, password FROM users WHERE email=$1`,
          [email]
        );
        if (verifyUser.password !== password) {
          throw new Error ("Passwords do not match our records")
        } else if (!verifyUser) {
          throw new Error("User not found");
        } else if (verifyUser.password === password) {
          const { password, ...rest } = verifyUser;
          const user = rest;
          return user;
        }
    } catch (error) {
        return error
    }
}

//helper to find user by id for other requests
const getUserById = async (userId) => {
    try {
      const {
        rows: [user],
      } = await client.query(
        `
    SELECT id, email
    FROM users
    WHERE id=$1;`,
        [userId]
      );
      return user;
    } catch (error) {
      return error;
    }
}

//get logged in user's information
const getUserInfo = async (email) => {
  try {
    const {rows:[user]} = await client.query(`
    SELECT id, email, name, address
    FROM users
    WHERE email=$1;`,
    [email]
    );
    return user
  } catch (error) {
    return error
  }
}



//exports
module.exports = {
    register,
    getUser,
    getUserById,
    getUserByEmail,
    getUserInfo
}