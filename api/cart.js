const express = require("express");
const router = express.Router();
const { requireUser } = require("./utils.js");
const { addToCart,
    removeFromCart,
    clearCart,
    updateCart,
    checkCart } = require("../db/cart.js")


//add items to cart (request only needs a body object with a quantity key, product comes from req.params, and user(addedBy) is discerned from token)
router.post('/:productId', requireUser, async (req, res, next) => {
    const {productId} = req.params
    const userId = req.user.id
    const { quantity } = req.body
    try {
      const checkUserCart = await checkCart(userId, productId)
      if (checkUserCart) {
        next({
          name: "AlreadyInCart",
          message: "That item is already in your cart, update it from your cart menu"
        })
      } else if (quantity < 1) {
        next({
          name: "Cart Error",
          message: "You must add a valid amount of an item to your cart"
        })
      } else {
      const addedItem = await addToCart(userId, productId, quantity)
      res.status(200).send(addedItem)
      }
    } catch ({name, message}) {
      next({name, message})
    }
})

//update quantity of item in cart (request only needs a body object with a quantity key, /:id is the **id from cart table AKA cart.product.id**, not the productId)
//use front end to check quantity added to cart doesn't exceed inventory on hand BEFORE making request
router.patch("/item/:id", requireUser, async (req, res, next) => {
  const {id} = req.params
  const { quantity } = req.body
  try {
    if (quantity < 1) {
      next({
        name: "CartError",
        message: "You can't put less than 1 of an item in your cart; remove it instead"
      })
    } else {
    const changeQuantityInCart = await updateCart(id, quantity)
    res.status(200).send(changeQuantityInCart)
    }
  } catch ({name, message}) {
    next({name, message})
  }
  
});

//remove from cart (request uses **id from cart table AKA cart.product.id**, not the productId)
//use front end to check quantity added to cart doesn't exceed inventory on hand BEFORE making request
router.delete("/item/:id", requireUser, async (req, res, next) => {
  const {id} = req.params
  try {
    const removedCartItem = await removeFromCart(id)
    if (removedCartItem) {res.status(200).send(removedCartItem)
    } else {
  next({
    name: "CartError",
    message: "Error removing item from cart"
  })}
  } catch ({name, message}) {
    next({name, message})
  }
});

//clear user's cart (basic delete request, discerns user from token)
router.delete("/", requireUser, async (req, res, next) => {
  const userId = req.user.id
  try {
    const deleteCart = await clearCart(userId)
    if (deleteCart) {
    res.status(200).send({message: "Cart successfully cleared"})
    } else {
      next({
        name: "CartError",
        message: "Error clearing cart"
      })
    }
  } catch ({name, message}) {
    next({name, message})
  }
})

//export the routes!
module.exports = router;