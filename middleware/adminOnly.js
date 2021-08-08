const jwt = require("jsonwebtoken");
const { User_game } = require("../models");
module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  let setAdmin = null;

  await User_game.findOne({ where: { is_admin: true } }).then(
    (admin) => (setAdmin = admin)
  );

  if (setAdmin.accessToken == authHeader) {
    jwt.verify(authHeader, "secretsamitoken", (err, user) => {
      err &&
        res.status(403).send({
          code: 403,
          status: "error",
          message: "Your token is not valid.",
        });
      next();
    });
  } else {
    res.status(403).send({
      code: 403,
      status: "error",
      message: "You do not have permission for the actions.",
    });
  }
};
