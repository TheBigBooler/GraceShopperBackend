const client = require("./client");

const createInitialUsers = async () => {
    console.log("creating users...");
    try {
        await client.query(`
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

        INSERT INTO admins (username, password)
        VALUES('admin', 'admin');
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
        VALUES ('playstation5', 'consoles', 'Brand new console from Sony!', 'https://picsum.photos/200', '500', '5');
        INSERT INTO products (name, category, description, image, price, inventory)
        VALUES ('xbox one', 'consoles', 'Brand new console from Microsoft!', 'https://picsum.photos/200', '499', '10');

        INSERT INTO products (name, category, description, image, price, inventory)
        VALUES ('Ratchet&Clank', 'games', 'Classic action RPG game', 'https://picsum.photos/200', '50', '25');
        INSERT INTO products (name, category, description, image, price, inventory)
        VALUES ('Call of Duty', 'games', 'Fast paced arcade shooter', 'https://picsum.photos/200', '40', '69');

        INSERT INTO products (name, category, description, image, price, inventory)
        VALUES ('Pikachu (MINT)', 'trading cards', 'Very well taken care of card', 'https://picsum.photos/200', '2000', '2');
        INSERT INTO products (name, category, description, image, price, inventory)
        VALUES ('Squirtle', 'trading cards', 'Has some nacho cheese on the corner, but still a rare card', 'https://picsum.photos/200', '10', '1');

        INSERT INTO products (name, category, description, image, price, inventory)
        VALUES ('Kakashi (sharingan revealed)', 'figures', '1:10 scale figurine of Kakashi', 'https://picsum.photos/200', '100', '7');
        INSERT INTO products (name, category, description, image, price, inventory)
        VALUES ('Chibi Eren Jaeger', 'figures', 'Small, cute version of a not so innocent man. Perfect for a keychain!', 'https://picsum.photos/200', '5', '20');

        INSERT INTO products (name, category, description, image, price, inventory)
        VALUES ('Leaf village headband', 'clothing', 'Look like a true shinobi with this stylish headband', 'https://picsum.photos/200', '15', '300');
        INSERT INTO products (name, category, description, image, price, inventory)
        VALUES ('DemonSlayer shirt', 'clothing', 'Featuring the main cast of Demon Slayer on front, title graphic on the back', 'https://picsum.photos/200', '35', '130');
        `);
        console.log("Products created!");
    } catch (error) {
        console.log("error creating products");
        console.log(error);
    }
}

const createInitialCart = async () => {
    console.log("creating cart items...")
    try {
        await client.query(`
        INSERT INTO cart ("addedBy", "productId", quantity)
        VALUES (1, 4, 2);
        INSERT INTO cart ("addedBy", "productId", quantity)
        VALUES (1, 3, 1);
        INSERT INTO cart ("addedBy", "productId", quantity)
        VALUES (1, 1, 2);
        INSERT INTO cart ("addedBy", "productId", quantity)
        VALUES (1, 10, 10);

        INSERT INTO cart ("addedBy", "productId", quantity)
        VALUES (2, 2, 2);
        INSERT INTO cart ("addedBy", "productId", quantity)
        VALUES (2, 3, 5);
        INSERT INTO cart ("addedBy", "productId", quantity)
        VALUES (2, 4, 5);

        INSERT INTO cart ("addedBy", "productId", quantity)
        VALUES (3, 9, 100);

        INSERT INTO cart ("addedBy", "productId", quantity)
        VALUES (4, 5, 1);
        INSERT INTO cart ("addedBy", "productId", quantity)
        VALUES (4, 6, 1);
        INSERT INTO cart ("addedBy", "productId", quantity)
        VALUES (4, 7, 1);

        INSERT INTO cart ("addedBy", "productId", quantity)
        VALUES (5, 9, 20);
        INSERT INTO cart ("addedBy", "productId", quantity)
        VALUES (5, 10, 20);
        `);
    } catch (error) {
        console.log("error creating cart items")
        console.log(error)
    }
}

const createInitialOrders = async () => {
    console.log("creating orders...")
    try {
        await client.query(`
        INSERT INTO orders (status, "purchasedBy")
        VALUES ('pending', 1);
        INSERT INTO order_products("orderId", "productId", price, quantity)
        VALUES (1, 1, 500, 1);
        INSERT INTO order_products("orderId", "productId", price, quantity)
        VALUES (1, 3, 25, 3);
        INSERT INTO order_products("orderId", "productId", price, quantity)
        VALUES (1, 5, 0, 2);

        INSERT INTO orders (status, "purchasedBy")
        VALUES ('pending', 4);
        INSERT INTO order_products("orderId", "productId", price, quantity)
        VALUES (2, 9, 15, 2);
        INSERT INTO order_products("orderId", "productId", price, quantity)
        VALUES (2, 10, 35, 3);
        INSERT INTO order_products("orderId", "productId", price, quantity)
        VALUES (2, 2, 499, 1);

        INSERT INTO orders (status, "purchasedBy")
        VALUES ('complete', 5);
        INSERT INTO order_products("orderId", "productId", price, quantity)
        VALUES (3, 1, 500, 1);
        INSERT INTO order_products("orderId", "productId", price, quantity)
        VALUES (3, 2, 499, 1);
        INSERT INTO order_products("orderId", "productId", price, quantity)
        VALUES (3, 3, 1, 10);
        INSERT INTO order_products("orderId", "productId", price, quantity)
        VALUES (3, 4, 1, 4);

        INSERT INTO orders (status, "purchasedBy")
        VALUES ('cancelled', 5);
        INSERT INTO order_products("orderId", "productId", price, quantity)
        VALUES (4, 7, 100, 1);

        INSERT INTO orders (status, "purchasedBy")
        VALUES ('complete', 2);
        INSERT INTO order_products("orderId", "productId", price, quantity)
        VALUES (5, 9, 15, 15);
        INSERT INTO order_products("orderId", "productId", price, quantity)
        VALUES (5, 10, 35, 20);
        `);
        console.log("Orders created!");
    } catch (error) {
        console.log("error creating orders");
        console.log(error)
    }
}

const createInitialReviews = async () => {
    try {
        await client.query(`
        INSERT INTO reviews (reviewer, "orderId", "productId", description)
        VALUES (1, 1, 3, 'Amazing game! recommended to all gamers');
        INSERT INTO reviews (reviewer, "orderId", "productId", description)
        VALUES (4, 2, 9, 'Makes me feel like a real ninja. Sizing is spot on!');
        INSERT INTO reviews (reviewer, "orderId", "productId", description)
        VALUES (5, 3, 1, 'I should have gotten the Xbox instead');
        INSERT INTO reviews (reviewer, "orderId", "productId", description)
        VALUES (5, 4, 7, 'It was not as cool in real life as the picture :(');
        INSERT INTO reviews (reviewer, "orderId", "productId", description)
        VALUES (2, 5, 10, 'I ordered a large but it fits like a small! Please check your sizing chart Empire Gaming');
        INSERT INTO reviews (reviewer, "orderId", "productId", description)
        VALUES (4, 2, 2, 'amazing console despite looking like a fridge. love it!');
        `);
    } catch (error) {
        console.log("error creating reviews")
        console.log(error)
    }
}

module.exports = { createInitialUsers, createInitialProducts, createInitialOrders, createInitialCart, createInitialReviews }