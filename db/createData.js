const client = require("./client");

const createInitialUsers = async () => {
    console.log("creating users...");
    try {
        await client.query(`
        INSERT INTO admins (username, password)
        VALUES ('admin', 'admin');

        INSERT INTO users (email, name, password, address)
        VALUES ('james@james.com', 'james', 'booler', '123 bool street');

        INSERT INTO users (email, name, password, address)
        VALUES ('hunter@hunter.com', 'hunter', 'hunter', '456 main street');

        INSERT INTO users (email, name, password, address)
        VALUES ('cameron@cameron.com', 'cameron', 'bullfrog', '789 ribbit street');

        INSERT INTO users (email, name, password, address)
        VALUES ('coolguy@toocool.com', 'iceman', 'yeti', '1 igloo lane');

        INSERT INTO users (email, name, password, address)
        VALUES ('albert@albert.com', 'albert', 'bertie123', '321 test drive');
        `);
        console.log("Users created!")
    } catch (error) {
        console.log("error creating users")
        console.log(error)
    }
}

const createInitialProducts = async () => {
    console.log("creating products...")
    try {
        await client.query(`
        INSERT INTO products (name, category, description, image, price, inventory)
        VALUES ('playstation5', 'consoles', 'Brand new console from Sony!', 'linktopicture', '500', '5');
        INSERT INTO products (name, category, description, image, price, inventory)
        VALUES ('xbox one', 'consoles', 'Brand new console from Microsoft!', 'linktopicture', '499', '10');

        INSERT INTO products (name, category, description, image, price, inventory)
        VALUES ('Ratchet&Clank', 'games', 'Classic action RPG game', 'linktopicture', '50', '25');
        INSERT INTO products (name, category, description, image, price, inventory)
        VALUES ('Call of Duty', 'games', 'Fast paced arcade shooter', 'linktopicture', '40', '69');

        INSERT INTO products (name, category, description, image, price, inventory)
        VALUES ('Pikachu (MINT)', 'trading cards', 'Very well taken care of card', 'linktopicture', '2000', '2');
        INSERT INTO products (name, category, description, image, price, inventory)
        VALUES ('Squirtle', 'trading cards', 'Has some nacho cheese on the corner, but still a rare card', 'linktopicture', '10', '1');

        INSERT INTO products (name, category, description, image, price, inventory)
        VALUES ('Kakashi (sharingan revealed)', 'figures', '1:10 scale figurine of Kakashi', 'linktopicture', '100', '7');
        INSERT INTO products (name, category, description, image, price, inventory)
        VALUES ('Chibi Eren Jaeger', 'figures', 'Small, cute version of a not so innocent man. Perfect for a keychain!', 'linktopicture', '5', '20');

        INSERT INTO products (name, category, description, image, price, inventory)
        VALUES ('Leaf village headband', 'clothing', 'Look like a true shinobi with this stylish headband', 'linktopicture', '15', '300');
        INSERT INTO products (name, category, description, image, price, inventory)
        VALUES ('DemonSlayer shirt', 'clothing', 'Featuring the main cast of Demon Slayer on front, title graphic on the back', 'linktopicture', '35', '130');
        `);
        console.log("Products created!");
    } catch (error) {
        console.log("error creating products");
        console.log(error);
    }
}

const createInitialOrders = async () => {
    console.log("creating orders...")
    try {
        await client.query(`
        INSERT INTO orders (status, "purchasedBy")
        VALUES ('pending', 1);
        INSERT INTO order_products("orderId", "productId", price)
        VALUES (1, 1, 500);
        INSERT INTO order_products("orderId", "productId", price)
        VALUES (1, 3, 25);
        INSERT INTO order_products("orderId", "productId", price)
        VALUES (1, 5, 0);

        INSERT INTO orders (status, "purchasedBy")
        VALUES ('pending', 4);
        INSERT INTO order_products("orderId", "productId", price)
        VALUES (2, 9, 15);
        INSERT INTO order_products("orderId", "productId", price)
        VALUES (2, 10, 35);
        INSERT INTO order_products("orderId", "productId", price)
        VALUES (2, 2, 499);

        INSERT INTO orders (status, "purchasedBy")
        VALUES ('complete', 5);
        INSERT INTO order_products("orderId", "productId", price)
        VALUES (3, 1, 500);
        INSERT INTO order_products("orderId", "productId", price)
        VALUES (3, 2, 499);
        INSERT INTO order_products("orderId", "productId", price)
        VALUES (3, 3, 1);
        INSERT INTO order_products("orderId", "productId", price)
        VALUES (3, 4, 1);

        INSERT INTO orders (status, "purchasedBy")
        VALUES ('cancelled', 5);
        INSERT INTO order_products("orderId", "productId", price)
        VALUES (4, 7, 100);
        `);
        console.log("Orders created!");
    } catch (error) {
        console.log("error creating orders");
        console.log(error)
    }
}

module.exports = { createInitialUsers, createInitialProducts, createInitialOrders }