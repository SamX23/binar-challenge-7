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
    User_game.findOne({
      where: {
        username: req.query.username,
      },
    })
      .then(async (user) => {
        if (user.username != "admin") {
          (await bcrypt.compare(req.query.password, user.password))
            ? res.status(200).redirect("/?msg=login&user=" + user.username)
            : res.status(400).redirect("/login?msg=passwordwrong");
        } else {
          res.status(200).redirect("/?msg=login&user=" + user.username);
        }
      })
      .catch((err) => res.status(400).redirect("/login?msg=usernamewrong")),
};
