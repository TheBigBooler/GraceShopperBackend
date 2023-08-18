const express = require("express");
const router = express.Router();
const { requireAdmin } = require("./utils.js");

//api/admin routes

//admin add products
router.post('/', (req, res) => {
    res.status(200).send("post request made to /products")
})

//admin view all products

//admin edit the products
router.patch('/:productId', (req, res) => {
    res.status(200).send(`post request made to /products${req.params}`)
})

//admin update order status
router.patch("/:orderId", (req, res) => {
  res.status(200).send(`patch request made to /orders/${req.params}`);
});

//admin get order history
router.get('/', (req, res) => {
    res.status(200).send("get request made to /orders");
})


module.exports = router;