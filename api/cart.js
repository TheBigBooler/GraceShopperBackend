const express = require("express");
const router = express.Router();
const { requireUser } = require("./utils.js");
const { addToCart,
    removeFromCart,
    clearCart,
    updateCart } = require("../db/cart.js")


//add items to cart
router.post('/:productId', async (req, res, next) => {
    
    try {
      const addedItem = await addToCart(req.body)
      return addedItem
    } catch ({name, message}) {
      next({name, message})
    }
})

//update quantity of item in cart
router.patch("/:productId", (req, res) => {
  res.status(200).send(`patch request made to /cart/${req.params}`);
});

//remove from cart
router.delete("/:productId", (req, res) => {
  res.status(200).send(`delete request made to /cart/${req.params}`);
});

//clear user's cart
router.delete("/", requireUser, async (req, res, next) => {
  const {userId} = req.user.id
  if (!req.user) {
    next({
      name: "NotLoggedIn",
      message: "You must be logged in to clear your cart"
    })
  }
  try {
    const deleteCart = await clearCart(userId)
    return deleteCart
  } catch ({name, message}) {
    next({name, message})
  }
})

//export the routes!
module.exports = router;