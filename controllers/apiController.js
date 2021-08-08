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
        .catch((err) =>
          res.status(400).send({
            code: 400,
            status: "error",
            message: "Please insert your username and password",
          })
        );
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
          code: 400,
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
                message: "Room generated succesfully !",
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

  room: async (req, res, next) => {
    await Game.findOne({
      where: {
        room: req.params.room,
      },
    }).then((game) => {
      game
        ? res.send(game)
        : res.status(400).send({
            code: 400,
            status: "error",
            message: "Room not found",
          });
    });
  },

  join: async (req, res, next) => {
    const roomId = req.params.room;
    let player = null;
    await User_game.findOne({ where: { username: req.body.username } })
      .then((user) => {
        if (user) {
          player = user;
        } else {
          res.status(400).send({
            code: 400,
            status: "error",
            message: "User not found",
          });
        }
      })
      .catch((err) =>
        res.status(400).send({
          code: 400,
          status: "error",
          message: "Username not found",
        })
      );

    await Game.findOne({
      where: {
        room: roomId,
      },
    })
      .then((room) => {
        if (player) {
          if (room.player_two == "") {
            Game.update(
              {
                player_two: player.username,
              },
              { where: { room: roomId } }
            ).then(() => res.send(room));
          } else {
            res.status(200).send({
              code: 200,
              status: "error",
              message: "Room is already full.",
            });
          }
        }
      })
      .catch((err) =>
        res.status(400).send({
          code: 400,
          status: "error",
          message: "Username not found",
        })
      );
  },
};
