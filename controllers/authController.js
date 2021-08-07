const {
  User_game,
  User_game_biodata,
  User_game_history,
} = require("../models");

module.exports = {
  login: (req, res, next) =>
    res.status(200).redirect("/?msg=login&user=" + req.user.username),

  register: (req, res, next) => {
    User_game.register(req.body)
      .then((user_game) => {
        User_game_biodata.create({
          user_id: user_game.get("id"),
        });
        User_game_history.create({
          user_id: user_game.get("id"),
        });
        res.status(201).redirect("/login");
      })
      .catch((err) => res.redirect("/register?msg=userexist"));
  },

  logout: (req, res) => {
    req.logout();
    res.redirect("/");
  },
};
