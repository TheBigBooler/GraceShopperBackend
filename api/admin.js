const client = require('../db/client')
const express = require("express");
const router = express.Router();
const { requireAdmin } = require("./utils.js");

//api/admin routes

//admin JWT verification
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

router.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        const {rows: [admin]} = await client.query(`
        SELECT username, id
        FROM admins
        WHERE id=${id};`)
        req.admin = await admin
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

//admin login
router.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
      next({
        name: "MissingCredentials",
        message: "Invalid login",
      });
    }
    
    try {
      const {rows: [admin]} = await client.query(`
      SELECT * FROM admins
      WHERE username=$1;`,
      [username]);
        console.log(admin)
      if (admin && admin.password === password) {
        const token = jwt.sign(
          { id: admin.id, username: admin.username },
          process.env.JWT_SECRET
        );
        res.send({
          admin: {
            id: admin.id,
            username: admin.username,
          },
          message: "You're logged in as an administrator!",
          token: token,
        });
      } else {
        next({
          name: "IncorrectCredentials",
          message: "Invalid login",
        });
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
})

//admin add products
router.post('/newproduct', (req, res) => {
    res.status(200).send("post request made to admin/newproduct")
})

//admin view all products
router.get('/products', requireAdmin, (req, res ) => {
    res.status(200).send("get request made to admin/products")
})

//admin edit the products
router.patch('/products/:productId', (req, res) => {
    const {productId} = req.params
    res.status(200).send(`patch request made to /products${productId}`)
})

//admin update order status
router.patch("/orders/:orderId", (req, res) => {
  res.status(200).send(`patch request made to /orders/${req.params}`);
});

//admin get order history
router.get('/', (req, res) => {
    res.status(200).send("get request made to /orders");
})


module.exports = router;