const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
//import any needed functions
const { requireUser } = require("./utils.js");


//api/users/...
router.post('/', async (req, res) => {
    res.status(200).send("post request made to api/users")
})



//export the routes!
module.exports = router;