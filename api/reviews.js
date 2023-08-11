const express = require("express");
const router = express.Router();
const { requireUser } = require("./utils.js");


//get reviews by product
router.get("/:productId", (req, res) => {
  res.status(200).send(`get request made to /reviews/${req.params}`);
});

//create review
router.post('/', (req, res) => {
    res.status(200).send('post request made to /reviews')
})

//edit review
router.patch("/:productId", (req, res) => {
  res.status(200).send(`patch request made to /reviews/${req.params}`);
});

//delete review
router.delete("/:productId", (req, res) => {
  res.status(200).send(`delete request made to /reviews/${req.params}`);
});

//export the routes!
module.exports = router;