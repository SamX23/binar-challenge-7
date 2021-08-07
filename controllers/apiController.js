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
  login: async (req, res) =>
    await User_game.authenticate(req.body).then((user) =>
      res.json(format(user))
    ),

  register: async (req, res, next) =>
    req.body.username != null && req.body.password != null
      ? await User_game.register(req.body)
          .then((user) => {
            User_game_biodata.create({
              user_id: user.get("id"),
            });
            User_game_history.create({
              user_id: user.get("id"),
            });
            res.send(format(user));
          })
          .catch((err) => next(err))
      : res.send("Please insert username and password"),

  whoami: (req, res) => {
    const currentUser = req.user;
    res.json(currentUser);
  },
};
