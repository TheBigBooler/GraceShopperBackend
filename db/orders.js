const client = require("./client");

//helper to attach products to individual order
const attachProductsToOrder = async (order) => {
    try {
        const {rows: orderProducts} = await client.query(`
        SELECT * FROM order_products
        WHERE "orderId"=${order.id};`)
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
        SELECT * FROM orders
        WHERE id=${orderId};`)
        order.products = await attachProductsToOrder(order)
        console.log(order)
        return order
    } catch (error) {
        return error
    }
}


//admin *************
//view all orders
const getAllOrders = async () => {
    try {const allOrders = await client.query(`
        SELECT * FROM orders;`)

        return allOrders
    } catch (error) {
        return error
    }
}

//update order status
const updateOrderStatus = async ({orderId, status}) => {
    try {
        const updatedOrder = await client.query(`
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
    updateOrderStatus
}