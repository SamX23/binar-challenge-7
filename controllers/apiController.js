const {
  User_game,
  User_game_biodata,
  User_game_history,
} = require("../models");

module.exports = {
  login: async (req, res) => {
    if (req.user) {
      res.send(
        `Username ${req.user.username} logged in using token ${req.authorization}`
      );
    } else {
      await User_game.authenticate(req.body)
        .then((user) =>
          res.send(
            `Username ${user.username} logged in succesfully, here is your access token ${user.accessToken}`
          )
        )
        .catch((err) => res.status(400).send("Error controller : " + err));
    }
  },

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
