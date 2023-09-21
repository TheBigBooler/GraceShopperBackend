//imports for setting up server
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

//Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());



//JWT verification
const jwt = require("jsonwebtoken");
const { getUserById } = require("./db/users");
const { JWT_SECRET } = process.env;


app.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});


//sets user for verifying authentication
app.use((req, res, next) => {
  if (req.user) {
    const user = req.user;
    console.log("User is set", user);
  }
  next();
});

//link /api routes to app
const apiRoutes = require('./api')
app.use("/api", apiRoutes);

//page not found handler
app.use((req, res) => {
  res.status(404).send("Request failed with status code 404: Page not found");
});

//error handler
app.use((error, req, res, next) => {
  res.send({
    name: error.name,
    message: error.message,
  });
});
//export app to server.js 
module.exports = app;
