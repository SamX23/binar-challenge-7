const {
  User_game,
  User_game_biodata,
  User_game_history,
} = require("../models");

module.exports = {
  index: (req, res) =>
    res.render("register", {
      title: "Register Page",
      userExist: req.query.msg,
      style: "login",
    }),

  auth: (req, res, next) => {
    User_game.register(req.body)
      .then((user_game) => {
        User_game_biodata.create({
          user_id: user_game.get("id"),
        });
        User_game_history.create({
          user_id: user_game.get("id"),
        });
        res.status(201).redirect("/?user=" + user_game.username);
      })
      .catch((err) => res.redirect("/register?msg=userexist"));
  },
};
