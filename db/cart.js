const client = require("./client");


//add item to cart
const addToCart = async (userId, productId, quantity) => {
    try {
        const { rows: [product]} = await client.query(`
        INSERT INTO cart ("addedBy", "productId", quantity)
        VALUES ($1, $2, $3)
        RETURNING *;`,
        [userId, productId, quantity])

        return product
    } catch (error) {
        return error
    }
}

//get users cart
const userCart = async (userId) => {
    try {
        const {rows: cart} = await client.query(`
        SELECT cart.*, products.name, products.price
        FROM cart
        JOIN products
        ON cart."productId"=products.id
        WHERE "addedBy"=${userId};`)
        return cart
    } catch (error) {
        return error
    }
}

//remove item from cart
const removeFromCart = async (id) => {
    try {
        const { rows: [removedProduct]} = await client.query(`
        DELETE FROM cart
        WHERE id=${id};`)

        return removedProduct
    } catch (error) {
        return error
    }
}
//change quantity of item in cart
const updateCart = async ({id, quantity}) => {
    try {
        const {rows: [updatedProduct]} = await client.query(`
        UPDATE CART
        SET quantity=$1
        WHERE id=$2;`,
        [quantity, id])
        return updatedProduct
    } catch (error) {
        return error
    }
}

//clear cart by request of user/upon checkout
const clearCart = async (userId) => {
    try {
        const {rows} = await client.query(`
        DELETE FROM cart
        WHERE "addedBy"=${userId};`)

        return rows
    } catch (error) {
        return error
    }
}

//check user's cart before adding item to it
const checkCart = async (userId, productId) => {
    try {
        const {
          rows: [product],
        } = await client.query(`
        SELECT cart.*, products.name, products.price
        FROM cart
        JOIN products
        ON cart."productId"=products.id
        WHERE "addedBy"=$1 AND "productId"=$2;`,
        [userId, productId]);
        return product
    } catch (error) {
        return error
    }
}

//exports
module.exports = {
    addToCart,
    removeFromCart,
    clearCart,
    updateCart,
    userCart,
    checkCart
}