const express = require("express");
const router = express.Router();
const { requireUser } = require("./utils.js");
const { review, deleteReview, reviewByProduct, reviewById} = require("../db/reviews.js")


//get reviews by product
router.get("/:productId", async(req, res, next) => {
 const {productId} = req.params;
 try {
  const getReviewByProduct = await reviewByProduct(productId);
  if (!getReviewByProduct){
    next({
      name: "Review does not exist",
      message: "Review for this product does not exist"
    })
  }
  res.status(200).send(getReviewByProduct)
 } catch ({ error, name, message}){
  next({error, name, message})
 }
});

 
  

//create review
router.post('/', async(req, res, next) => {
    
})
try{
  const createdReview = await createReview({
    madeBy: req.user.id,
    product: req.product.id,
    review: req.body.review
  });
  if (!crreatedReview) {
    next({
      name: "Review not created",
      message: "Review could not be made, try again"
    })
  } else {
    res.status(200).send(createdReview);
  }
 
} catch ({error, name, message}) {
  next ({ error, name, message});
}





//edit review
router.patch("/:reviewId", async(req, res) => {
  
});
const editedReview = await editReview ({
  name: req.body.name,
  message: req.body.review
});
res.status(200).send(editedReview);






//delete review
router.delete("/:reviewId", async(req, res, next) => {
  
});
try {
  const  { reviewId} = req.params
  const reviewMaker = await getReviewById(reviewId)
  if (reviewMaker.userId !== req.user.id) {
    res.status(403).send({
      name: "Invalid User",
      message: 'User ${req.user.userId} can not delte'
    })
  }
  const {deletedReview} = await deleteReview(reviewId);
  res.status(200).send(deletedReview);

} catch ({error, name, message}) {
  next ({error, name, message})
}


//export the routes!
module.exports = router;