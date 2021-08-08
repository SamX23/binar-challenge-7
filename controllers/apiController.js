const {
  User_game,
  User_game_biodata,
  User_game_history,
  Game,
} = require("../models");

module.exports = {
  login: async (req, res) => {
    if (req.user) {
      res.send({
        code: 200,
        message: "Logged in succesfully !",
        user: req.user,
      });
    } else {
      await User_game.authenticate(req.body)
        .then((user) =>
          res.send({
            code: 200,
            message: "Logged in succesfully !",
            user,
          })
        )
        .catch((err) => res.status(400).send(`Error : ${err}`));
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
            res.send(user);
          })
          .catch((err) => res.status(400).send(`Error : ${err}`))
      : res.send({
          code: 200,
          status: "error",
          message: "Please insert your username and password",
        }),

  whoami: async (req, res) => await res.json(req.user),

  create_room: async (req, res) =>
    await User_game.findOne({ where: { username: req.body.username } })
      .then(
        async (user) =>
          await Game.create({
            player_one: user.username,
            room: req.body.room,
          })
            .then((game) =>
              res.send({
                code: 200,
                message:
                  "Room succesfully generated, see already room at '/room-list'",
                game,
              })
            )
            .catch((err) =>
              res.status(400).send({
                code: 400,
                status: "error",
                message: "Room exist or invalid input",
              })
            )
      )
      .catch((err) =>
        res.status(400).send({
          code: 400,
          status: "error",
          message: "Username not found",
        })
      ),

  all_room: async (req, res) =>
    await Game.findAll({
      order: [["id", "ASC"]],
    }).then((game) => res.status(200).send(game)),

  play_room: (req, res, next) => {
    res.send(`Room id ${req.params.room} is not finished yet.`);
  },

  fight: (req, res, next) => {
    res.send("Not finished yet :)");
  },
};
