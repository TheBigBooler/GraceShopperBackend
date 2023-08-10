const express = require("express");
const router = express.Router();
const { requireUser } = require("./utils.js");


//add items to cart
router.post('/:productId', (req, res) => {
    res.status(200).send(`post request made to /cart/${req.params}`);
})

//update quantity of item in cart
router.patch("/:productId", (req, res) => {
  res.status(200).send(`patch request made to /cart/${req.params}`);
});

//remove from cart
router.delete("/:productId", (req, res) => {
  res.status(200).send(`delete request made to /cart/${req.params}`);
});

//export the routes!
module.exports = router;