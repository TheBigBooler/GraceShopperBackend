const client = require("./client");

//get user's order history
const attachProductsToOrder = async (order) => {
    try {
        const {rows: orderProducts} = await client.query(`
        SELECT * FROM order_products
        WHERE "orderId"=${order.id}`)
        order.products = orderProducts
        return order
    } catch (error) {
        return error
    }
}

const getOrderHistory = async (userId) => {
    try {
        const { rows: orders } = await client.query(`
        SELECT * FROM orders
        WHERE "purchasedBy"=${userId};`)
        const ordersWithProducts = orders.map(attachProductsToOrder)
        return ordersWithProducts
    } catch (error) {
        return error
    }
}

//create order



//admin *************
//view all orders

//update order status



module.exports = {
    getOrderHistory,
}