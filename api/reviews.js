const express = require("express");
const router = express.Router();
const { requireUser } = require("./utils.js");
const { createReview, deleteReview, reviewByProduct, reviewById, editedReview,} = require("../db/reviews.js")


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
router.post('/', requireUser, async(req, res, next) => {
    
try{
  const createdReview = await createReview({
    userId: req.user.id,
    orderId: req.body.orderId,
    productId: req.body.productId,
    description: req.body.description
  });
  if (!createdReview) {
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
})





//edit review
router.patch("/:reviewId", async(req, res) => {
  const {reviewId} = req.params
  const {description} = req.body

const editReview = await editedReview(reviewId, description)
res.status(200).send(editReview);
})






//delete review
router.delete("/:reviewId",requireUser, async(req, res, next) => {
  

try {
  const  {reviewId} = req.params
  const reviewMaker = await reviewById(reviewId)
  if (reviewMaker.reviewer !== req.user.id) {
    res.status(403).send({
      name: "Invalid User",
      message: 'User ${req.user.userId} can not delte'
    })
  }
  const deletedReview = await deleteReview(reviewId);
  res.status(200).send(deletedReview);

} catch ({error, name, message}) {
  next ({error, name, message})
}
})


//export the routes!
module.exports = router;