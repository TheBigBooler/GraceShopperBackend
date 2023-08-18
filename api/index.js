const express = require("express");
const router = express.Router();

//check health of server
router.get('/health', async (req, res, next) => {
  try {
    res.status(200).send("API is up and running!");
  } catch (error) {
    next(error);
  }
});

//sets router for users routes
const usersRouter = require("./users");
router.use("/users", usersRouter);

//products routes
const productsRouter = require("./products");
router.use("/products", productsRouter);

//cart routes
const cartRouter = require("./cart");
router.use("/cart", cartRouter);

//orders routes
const ordersRouter = require("./orders");
router.use("/orders", ordersRouter);

//reviews routes
const reviewsRouter = require("./reviews");
router.use("/reviews", reviewsRouter);

//admin routes
const adminRouter = require("./admin");
router.use("/admin", adminRouter)


//export routes!
module.exports = router;