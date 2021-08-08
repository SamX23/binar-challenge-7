const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    jwt.verify(authHeader, "secretsamitoken", (err, user) => {
      if (err) {
        return res.status(400).send({
          code: 400,
          status: "error",
          message: "Your token is not valid.",
        });
      }

      // Check token auth header == auth token user
      if (req.body.username) {
        if (req.body.username == user.username) {
          req.user = user;
          req.authorization = authHeader;
          next();
        } else {
          return res.status(403).send({
            code: 403,
            status: "error",
            message: "Your token is not match.",
          });
        }
      } else {
        req.user = user;
        req.authorization = authHeader;
        next();
      }
    });
  } else {
    res.status(403).send({
      code: 403,
      status: "error",
      message: "You don't have permission, login to get authentication token.",
    });
    // res.redirect("/login");
  }
};
