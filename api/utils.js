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

//middleware to check for admin
const requireAdmin = (req, res, next) => {

}

module.exports = { requireUser, requireAdmin };
