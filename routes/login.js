const express = require("express");
const app = express.Router();
const { User_game } = require("../models");
const bcrypt = require("bcrypt");

// Login Page
app.get("/login", (req, res, next) =>
  res.render("login", { title: "Login Page", msg: req.query.msg })
);

app.get("/login/auth", (req, res, next) =>
  User_game.findOne({
    where: {
      username: req.query.username,
    },
  })
    .then(async (user) => {
      if (user.username != "admin") {
        (await bcrypt.compare(req.query.password, user.password))
          ? res.status(200).redirect("/?user=" + user.username)
          : res.status(400).redirect("/login?msg=passwordwrong");
      } else {
        res.status(200).redirect("/?user=" + user.username);
      }
    })
    .catch((err) => res.status(400).redirect("/login?msg=usernamewrong"))
);

module.exports = app;
