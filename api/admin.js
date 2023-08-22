const client = require('../db/client')
const express = require("express");
const router = express.Router();
const { requireAdmin } = require("./utils.js");
const { getAllProducts, addProduct, changeProductInventory, getProductById, deleteProduct } = require('../db/products')
const { getAllOrders, updateOrderStatus, getOrderById } = require('../db/orders')
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
router.post('/products/new', requireAdmin, async (req, res, next) => {
    try {
        const newProduct = await addProduct(req.body)
        if (!newProduct) {
            next({
                name: "ProductError",
                message: "Product creation unsuccesful, try again"
            })
        } else {
        res.status(200).send(newProduct)
        }
    } catch ({name, message}) {
        next({name, message})
    }
})

//admin view all products
router.get('/products', requireAdmin, async (req, res, next) => {
    try {
        const allProducts = await getAllProducts()
        res.status(200).send(allProducts)
    } catch ({name, message}) {
        next({name, message})
    }
})

//admin change inventory count
router.patch('/products/count/:productId', requireAdmin, async (req, res, next) => {
    const {productId} = req.params
    const {count} = req.body
    try {
        const inventoriedProduct = await changeProductInventory(productId, count)
        const checkProduct = await getProductById(productId)
        if (!checkProduct) {
            next({
                name: "ProductError",
                message: "Product not found"
            })
        } else {
            res.status(200).send(inventoriedProduct)
        }
    } catch ({name, message}) {
        next({name, message})
    }
})

//admin deactive product
router.delete('/products/:productId', requireAdmin, async (req, res, next) => {
    const { productId } = req.params;
    try {
      const deletedProduct = await deleteProduct(productId)
      const checkProduct = await getProductById(productId);
      if (!checkProduct) {
        next({
          name: "ProductError",
          message: "Product not found",
        });
      } else {
        res.status(200).send(deletedProduct);
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
})

//not done yet ************************************************ need to make a db function
//admin edit the product description/price/reactivate
router.patch('/products/:productId', requireAdmin, async (req, res, next) => {
    const {productId} = req.params
    res.status(200).send(`patch request made to /products${productId}`)
})

//admin update order status
router.patch("/orders/:orderId", requireAdmin, async (req, res, next) => {
    const {orderId} = req.params
    const {status} = req.body
    try {
        const updatedOrder = await updateOrderStatus(orderId, status)
        const checkOrder = await getOrderById(orderId)
        if (!checkOrder) {
            next({
                name: "OrderError",
                message: "Order not found"
            })
        } else {
            res.status(200).send(updatedOrder)
        }
    } catch ({name, message}) {
        next({name, message})
    }
});

//admin get order history
router.get('/orders', requireAdmin, async (req, res, next) => {
    try {
        const allOrders = await getAllOrders()
        if (!allOrders) {
            next({
                name: "OrderError",
            message: "Error retrieving orders"})
        } else {
            res.status(200).send(allOrders)
         }
    } catch ({name, message}) {
        next({name, message})   
    }
})

//admin get individual order
router.get('/orders/:orderId', requireAdmin, async (req, res, next) => {
    const { orderId } = req.params
    try {
        const order = await getOrderById(orderId)
        if (!order.length) {
            next({
                name: "OrderError",
                message: "Order not found"
            })
        } else {
            res.status(200).send(order)
        }
    } catch ({name, message}) {
        next({name, message})
    }
})

module.exports = router;