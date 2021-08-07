const {
  User_game,
  User_game_biodata,
  User_game_history,
} = require("../models");

const format = (user) => {
  const { id, username, is_admin } = user;
  return {
    id,
    username,
    is_admin,
    accessToken: user.generateToken(),
  };
};

module.exports = {
  login: (req, res, next) =>
    User_game.authenticate(req.body)
      .then((user) =>
        res.status(200).redirect("/?msg=login&user=" + user.username)
      )
      .catch((err) => res.status(400).redirect("/login?msg=notfound")),

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

  // To API
  login_api: (req, res) =>
    User_game.authenticate(req.body).then((user) => res.json(format(user))),

  register_api: (req, res, next) =>
    User_game.register(req.body)
      .then((user) => res.json(format(user)))
      .catch((err) => next(err)),

  whoami: (req, res) => {
    const currentUser = req.user;
    res.json(currentUser);
  },
};
