//middleware to check user before making request

const requireUser = (req, res, next) => {
  if (!req.user) {
    next({
      name: "Not logged in",
      message: "You must be logged in to perform this action",
    });
  }

  next();
};

module.exports = { requireUser };
