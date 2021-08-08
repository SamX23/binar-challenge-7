const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    jwt.verify(authHeader, "secretsamitoken", (err, user) => {
      if (err) {
        return res.status(403).send("Error : " + err);
      }

      req.user = user;
      req.authorization = authHeader;
      next();
    });
  } else {
    next();
  }
};
