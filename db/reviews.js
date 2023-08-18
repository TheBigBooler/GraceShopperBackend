const client = require("./client");

// Create a review
async function review({userId, orderId, productId, description}) {
    try {
    const {rows: [review]} = await client.query (`
      INSERT INTO reviews ("userId", "orderId", "productId", description) VALUES ($1, $2, $3, $4) RETURNING *;`,
      [userId, orderId, productId, description]
    );
    return review;
     } catch (error) {
    console.error(error);
    throw error;
  }
    
}

// Delete review
async function deleteReview(id) {
  try {
    const { rows: [deleteReview] } = await client.query(
      `
  DELETE FROM reviews WHERE reviews.id=$1 RETURNING *;`,
      [id]
    );

    return deleteReview;
  } catch (error) {
    throw error;
  }
}

//Get Reviews by product
async function reviewByProduct(productId, review) {
    try{
        const { rows: review } = await client.query(
            'SELECT * FROM reviews WHERE "productId" = $1;',
            [productId]
        );
        return review;
    } catch (error) {
        throw error;
    }
}



//Get reviews by ID
const reviewById = async (reviewId) => {
    try { const { rows: [review], } = await client.query(
        `SELECT review FROM reviews WHERE id=$1;`,
        [reviewId]
      );

      return review;
    } catch (error) {
      return error;
    }
}



module.exports = {
    review,
    deleteReview,
    reviewByProduct,
    reviewById
}