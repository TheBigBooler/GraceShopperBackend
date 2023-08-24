const client = require("./client");


//get all the products
const getAllProducts = async () => {
    try {
        const { rows } = await client.query(`
        SELECT * FROM products;`)
        return rows
    } catch (error) {
        return error
    }
}

//get individual product
const getProductById = async (productId) => {
    try {
        const {rows: [product]} = await client.query(`
        SELECT * FROM products
        WHERE id=${productId};`)
        return product
    } catch (error) {
        return error
    }
}

//get active products
const getActiveProducts = async () => {
    try {
        const { rows } = await client.query(`
        SELECT * FROM products
        WHERE active=true;`)
        return rows
    } catch (error) {
        return error
    }
}

//decrease inventory when item is purchased
const decreaseInventory = async (id, quantity) => {
    try {
        const {rows: [purchasedProduct]} = await client.query(`
        UPDATE products
        SET inventory=(inventory-$1)
        WHERE id=$2;`,
        [quantity, id])
        return purchasedProduct
    } catch (error) {
        return error
    }
}

//admin functions *****************

//add products to store
const addProduct = async ({name, category, description, image, price, inventory}) => {
    try {
        const {
          rows: [product],
        } = await client.query(
          `
        INSERT INTO products (name, category, description, image, price, inventory)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (name) DO NOTHING
        RETURNING *;`,
          [name, category, description, image, price, inventory]
        );
            return product
    } catch (error) {
        return error
    }
}

//discontinue product
const deleteProduct = async (id) => {
    try {
        const {rows: [deletedProduct]} = await client.query(`
        UPDATE products
        SET active=false
        WHERE id=${id}
        RETURNING *;`)
        return deletedProduct
    } catch (error) {
        return error
    }
}

//restock/fix inventory for product
const changeProductInventory = async (id, count) => {
    try {
        const {rows: [updatedCount]} = await client.query(`
        UPDATE products
        SET inventory=$1
        WHERE id=$2
        RETURNING *;`,
        [count, id])
        return updatedCount
    } catch (error) {
        return error
    }
}

//edit product info
const updateProduct = async ({id, ...fields}) => {
    console.log(fields)
    const newString = Object.keys(fields)
      .map((key, index) => `"${key}"=$${index + 1}`)
      .join(",");
      try {
        if (newString.length > 0) {
          const {
            rows: [updatedProduct],
          } = await client.query(
            `
      UPDATE products
      SET ${newString}
      WHERE id=${id}
      RETURNING *;
      `,
            Object.values(fields)
          );
          return updatedProduct;
        }
      } catch (error) {
        console.log("error updating product");
        return error;
      }
}



//exports
module.exports = {
    getAllProducts,
    getActiveProducts,
    addProduct,
    deleteProduct,
    changeProductInventory,
    decreaseInventory,
    getProductById,
    updateProduct
}