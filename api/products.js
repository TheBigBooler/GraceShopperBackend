const express = require("express");
const router = express.Router();
const { requireUser } = require("./utils.js");
const { getActiveProducts, getProductById } = require("../db/products.js")

//get all active products
router.get('/', async (req, res, next) => {
    try {
        const products = await getActiveProducts()
        res.status(200).send(products)
    } catch ({name, message}) {
        next({name, message})
    }
})

//get product by Id
router.get('/:productId', async (req, res, next) => {
    const { productId } = req.params
    try {
        const product = await getProductById(productId)
        if (!product) {
            next({
              name: "ProductNotFound",
              message: "No matching product was found for that ID",
            });
        } else if (product.active === false) {
            next({
                name: "ProductDiscontinued",
                message: "That product is no longer carried by our store. We apologize"
          });
        } else {
          res.status(200).send(product);
        }
    } catch ({name, message}) {
        next({name, message})
    }
})



//export the routes!
module.exports = router;