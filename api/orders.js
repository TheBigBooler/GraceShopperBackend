const express = require("express");
const router = express.Router();
const { requireUser } = require("./utils.js");
const { createOrder, getOrderById } = require("../db/orders.js")
const { clearCart } = require("../db/cart.js")


//create order (gets user from token, expects an [array of products] passed in -- the information contained in the cart products will work passed to this function)
router.post("/", requireUser, async (req, res, next) => {
  const userId = req.user.id
  const products = req.body.products
  try {
    const order = await createOrder(userId, products)
    if (!order) {
      next({
        name: "OrderError",
        message: "Order was unable to be created, please try again"
      })
    } else if (!products) {
      next({
        name: "OrderError",
        message: "Order can't be created without any products"
      })
    } else {
      await clearCart(userId)
      res.status(200).send(order)
    }
  } catch ({name, message}) {
    next({name, message})
  }
});

//get order by ID 
router.get('/:orderId', requireUser, async (req, res, next) => {
  const {orderId} = req.params
  try {
    const order = await getOrderById(orderId)
    if (!order.id) {
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


//export the routes!
module.exports = router;