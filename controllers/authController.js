const {
  User_game,
  User_game_biodata,
  User_game_history,
} = require("../models");

module.exports = {
  login: async (req, res, next) =>
    await User_game.authenticate(req.body)
      .then((user) =>
        res.status(200).redirect("/?msg=login&user=" + user.username)
      )
      .catch((err) => res.status(400).redirect("/login?msg=notfound")),

  register: async (req, res, next) => {
    await User_game.register(req.body)
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
