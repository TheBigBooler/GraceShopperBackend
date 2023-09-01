const client = require("./client");
const { decreaseInventory } = require('./products')

//helper to attach products to individual order
const attachProductsToOrder = async (order) => {
    try {
        const { rows: orderProducts } = await client.query(`
        SELECT order_products.*, products.name 
        FROM order_products
        JOIN products
        ON order_products."productId"=products.id
        WHERE "orderId"=${order.id};`);
        // console.log(order)
        return orderProducts
    } catch (error) {
        return error
    }
}

//get user's order history
const getOrderHistory = async (userId) => {
    try {
        const { rows: orders } = await client.query(`
        SELECT * FROM orders
        WHERE "purchasedBy"=${userId};`)
        const ordersWithProducts = await Promise.all(orders.map(async (order) => {
            const products = await attachProductsToOrder(order)
            // console.log(products)
            order.products = products
            // console.log(order)
            return order
        }))
        return ordersWithProducts
    } catch (error) {
        return error
    }
}

//get individiaul order information
const getOrderById = async (orderId) => {
    try {
        const { rows: [ order ]} = await client.query(`
        SELECT orders.*, users.email, users.name
        FROM orders
        JOIN users
        ON orders."purchasedBy"=users.id
        WHERE orders.id=${orderId};`)
        order.products = await attachProductsToOrder(order)
        console.log(order)
        return order
    } catch (error) {
        return error
    }
}

//create order, array of [products] {productId, price, quantity} (same information from cart); then decreases inventory based on purchased items
const createOrder = async (userId, products) => {
    try {
        const {
          rows: [order],
        } = await client.query(`
        INSERT INTO orders ("purchasedBy")
        VALUES (${userId})
        RETURNING *;`
        );
        const createdOrderId = order.id
        //then add the products to the order_products table
        products.map(async (product) => {
            const {rows: [addedProduct]} = await client.query(`
            INSERT INTO order_products ("orderId", "productId", price, quantity)
            VALUES ($1, $2, $3, $4);`,
            [createdOrderId, product.productId, product.price, product.quantity])
            await decreaseInventory(product.productId, product.quantity);
            return addedProduct
        });
        //send back created order info
        const createdOrder = await getOrderById(createdOrderId)
        return createdOrder
    } catch (error) {
        return error
    }
}

//admin *************
//view all orders
const getAllOrders = async () => {
    try {const { rows:allOrders } = await client.query(`
        SELECT * FROM orders;`)

        return allOrders
    } catch (error) {
        return error
    }
}

//update order status
const updateOrderStatus = async (orderId, status) => {
    try {
        const {rows: [updatedOrder]} = await client.query(`
        UPDATE orders
        SET status=$1
        WHERE id=$2
        RETURNING *;`,
        [status, orderId])
        return updatedOrder
    } catch (error) {
        return error
    }
}


module.exports = {
    getOrderHistory,
    getAllOrders,
    getOrderHistory,
    getOrderById,
    updateOrderStatus,
    createOrder
}