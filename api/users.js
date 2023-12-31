const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
//import any needed functions
const { requireUser } = require("./utils.js");
const { register, getUserByEmail, getUserInfo } = require('../db/users.js')
const { getOrderHistory } = require('../db/orders.js')
const { userCart } = require('../db/cart.js')


//api/users/...

//register user
router.post('/register', async (req, res, next) => {
    console.log(req.body)
    const { email, password } = req.body;
    //check for existing user first
    try {
      const userExists = await getUserByEmail(email);
      if (userExists) {
        next({
          name: "UserExists",
          message: `Email: ${email} is already in use.`,
        });
      }
      if (password.length < 5) {
        next({
          message: "Password Too Short!",
          name: "InvalidPassword",
        });
      } else {
        const newUser = await register(req.body);
        const token = jwt.sign(
          {
            id: newUser.id,
            email: newUser.email
          },
          process.env.JWT_SECRET
        );

        res.send({
          message: "Registration successful!",
          token: token,
          user: {
            id: newUser.id,
            email: newUser.email,
          },
        });
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
})

//login user
router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      next({
        name: "MissingCredentials",
        message: "Please provide both an email and password",
      });
    }

    try {
      const user = await getUserByEmail(email);

      if (user && user.password === password) {
        const token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET
        );
        res.send({
          user: {
            id: user.id,
            email: user.email,
          },
          message: "you're logged in!",
          token: token,
        });
      } else {
        next({
          name: "IncorrectCredentials",
          message: "Email or password is incorrect",
        });
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
})

//get users orders (uses token to discern user for request)
router.get('/me/orders', requireUser, async (req, res) => {
    const userId = req.user.id
    try {
      const userOrders = await getOrderHistory(userId)
      res.status(200).send(userOrders);
    } catch ({name, message}) {
      next({name, message})
    }
})

// get user's cart (uses token to discern user for request)
router.get('/me/cart', requireUser, async (req, res) => {
    const userId = req.user.id;
    try {
      const cart = await userCart(userId);
      if (!cart) {
        next({
          name: "CartEmpty",
          message: "Your cart is empty!"
        })
      } else { 
        res.status(200).send(cart)
      }
    } catch ({name, message}) {
      next({name, message})
    }
})

//get user's info
router.get('/me', requireUser, async (req, res, next) => {
    if (!req.headers) {
      next({
        name: "NotLoggedIn",
        message: "You must be logged in to view your profile"
      })
    }
    try {
      const userInfo = await getUserInfo(req.user.email)
      res.status(200).send(userInfo)
    } catch ({name, message}) {
      next({name, message})
    }
})


//export the routes!
module.exports = router;