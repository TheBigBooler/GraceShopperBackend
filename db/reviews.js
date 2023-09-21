const client = require("./client");

// Create a review
async function createReview({ userId, orderId, productId, description }) {
  try {
    const {
      rows: [review],
    } = await client.query(
      `
      INSERT INTO reviews (reviewer, "orderId", "productId", description) VALUES ($1, $2, $3, $4) RETURNING *;`,
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
    const {
      rows: [deleteReview],
    } = await client.query(
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
async function reviewByProduct(productId) {
  try {
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
  try {
    const {
      rows: [review],
    } = await client.query(`SELECT review FROM reviews WHERE id=$1;`, [
      reviewId,
    ]);

    return review;
  } catch (error) {
    return error;
  }
};

// Edit review
const editedReview = async (reviewId, description) => {
  try {
    const {
      rows: [updatedReview],
    } = await client.query(
      "UPDATE reviews SET description=$2 WHERE id=$1 RETURNING *;",
      [reviewId, description]
    );

    return updatedReview;
  } catch (error) {
    return error;
  }
};

//Get all reviews for admin moderation
const getAllReviews = async () => {
  try {
    const {
      rows: allReviews,
    } = await client.query(`
    SELECT * 
    FROM reviews;
    `);
    return allReviews;
  } catch (error) {
    return error;
  }
};

module.exports = {
  createReview,
  deleteReview,
  reviewByProduct,
  reviewById,
  editedReview,
  getAllReviews,
};
