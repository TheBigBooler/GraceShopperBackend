const express = require("express");
const router = express.Router();

//check health of server
router.get('/health', async (req, res, next) => {
  try {
    res.status(200).send("API is up and running!");
  } catch (error) {
    next(error);
  }
});

//sets router for users routes
const usersRouter = require("./users");
router.use("/users", usersRouter);

//follow same structure for other routes below






//export routes!
module.exports = router;