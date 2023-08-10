const express = require("express");
const router = express.Router();
const { requireUser } = require("./utils.js");

//get all products
router.get('/', (req, res) => {
    res.status(200).send('request made to /products')
})

// get product by category
router.get('/:category', (req, res) => {
    res.status(200).send(`request made to /products/${req.params}`)
})

//admin add products
router.post('/', (req, res) => {
    res.status(200).send("post request made to /products")
})

//admin edit the products
router.patch('/:productId', (req, res) => {
    res.status(200).send(`post request made to /products${req.params}`)
})

//export the routes!
module.exports = router;