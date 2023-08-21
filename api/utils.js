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
  if(!req.admin) {
    next({
      name: "InvalidPriveleges",
      message: "You must be logged in as an administrator to perform this action"
    })
  }

  next();
}

module.exports = { requireUser, requireAdmin };
