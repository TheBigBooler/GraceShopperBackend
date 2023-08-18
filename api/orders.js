const express = require("express");
const router = express.Router();
const { requireUser } = require("./utils.js");




//create order 
router.post("/", (req, res) => {
  res.status(200).send("post request made to /orders");
});



//export the routes!
module.exports = router;