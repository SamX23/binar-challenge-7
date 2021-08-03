const { User_game } = require("../models");
const bcrypt = require("bcrypt");

module.exports = {
  index: (req, res, next) =>
    res.render("login", {
      title: "Login Page",
      msg: req.query.msg,
      style: "login",
    }),
  auth: (req, res, next) =>
    User_game.authenticate(req.body)
      .then((user) =>
        res.status(200).redirect("/?msg=login&user=" + user.username)
      )
      .catch((err) => res.status(400).redirect("/login?msg=" + err)),
};
