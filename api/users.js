const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
//import any needed functions
const { requireUser } = require("./utils.js");


//api/users/...

//register user
router.post('/register', async (req, res) => {
    res.status(200).send("post request made to users/register")
})

//login user
router.post('/login', async (req, res) => {
    res.status(200).send("post request made to users/login")
})

//get users orders
router.get('/:userId/orders', requireUser, async (req, res) => {
    res.status(200).send(`get request made to users/${req.params}/orders`)
})

// get user's cart
router.get('/:userId/cart', requireUser, async (req, res) => {
    res.status(200).send(`get request made to users/${req.params}/cart`)
})

//get user's info
router.get('/me', requireUser, async (req, res) => {
    res.status(200).send(`get request made to users/me`)
})


//export the routes!
module.exports = router;