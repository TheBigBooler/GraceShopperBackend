const express = require("express");
const router = express.Router();
const { requireUser } = require("./utils.js");


//admin get order history
router.get('/', (req, res) => {
    res.status(200).send("get request made to /orders");
})

//create order 
router.post("/", (req, res) => {
  res.status(200).send("post request made to /orders");
});

//admin update order status
router.patch("/:orderId", (req, res) => {
  res.status(200).send(`patch request made to /orders/${req.params}`);
});

//export the routes!
module.exports = router;