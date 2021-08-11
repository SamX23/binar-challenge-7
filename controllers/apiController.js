const {
  User_game,
  User_game_biodata,
  User_game_history,
  Game,
} = require("../models");

module.exports = {
  all_user: async (req, res) =>
    await User_game.findAll({
      include: [
        {
          model: User_game_biodata,
        },
        {
          model: User_game_history,
        },
      ],
    }).then((user) =>
      user.length == 0
        ? res.status(200).send("No users yet!")
        : res.status(200).json(user)
    ),

  user: async (req, res) =>
    await User_game.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User_game_biodata,
        },
        {
          model: User_game_history,
        },
      ],
    }).then((user) =>
      user ? res.status(200).json(user) : res.status(200).send("ID not found")
    ),

  update_user: async (req, res) =>
    await User_game.update(
      {
        username: req.body.username,
        password: req.body.password,
      },
      { where: { id: req.params.id } }
    )
      .then(async (user) => {
        await User_game_biodata.update(
          {
            full_name: req.body.full_name,
            email: req.body.email,
          },
          { where: { user_id: req.params.id } }
        );
        await User_game_history.update(
          {
            win: req.body.win,
            lose: req.body.lose,
            score: req.body.score,
          },
          { where: { user_id: req.params.id } }
        );

        res.status(201).send({
          code: 201,
          message: `Users id of ${req.params.id} has been updated!`,
        });
      })
      .catch(() => res.status(422).send("Cannot update user")),

  delete_user: async (req, res) =>
    await User_game.destroy({ where: { id: req.params.id } })
      .then(() =>
        res.status(201).json({
          message: `Users id of ${req.params.id} has been deleted!`,
        })
      )
      .catch(() => res.status(422).send("Cannot delete the user id")),

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

  join: async (req, res, next) => {
    const roomId = req.params.room;
    const player = await User_game.findOne({
      where: { username: req.body.username },
    });

    if (player) {
      const room = await Game.findOne({ where: { room: roomId } });
      if (
        room.player_one == player.username ||
        room.player_two == player.username
      ) {
        res.send({
          code: 400,
          status: "error",
          message: `${player.username} already in the room.`,
        });
      } else {
        await Game.update(
          {
            player_two: player.username,
          },
          { where: { room: roomId } }
        ).then(() =>
          res.send({
            code: 200,
            message: `${player.username} joined the room.`,
          })
        );
      }
    } else {
      res.status(400).send({
        code: 400,
        status: "error",
        message: "User not found",
      });
    }
  },

  play: async (req, res, next) => {
    const room = req.params.room;
    const currentRoom = await Game.findOne({ where: { room: room } });
    const player = req.body.player;
    const choice = req.body.choice;

    currentRoom == 0 ||
      (currentRoom == null &&
        res.status(400).send({
          code: 400,
          status: "error",
          message: "Room not found",
        }));

    const currentPlayer = (player) => {
      if (player == currentRoom.player_one) {
        return "Player One";
      } else if (player == currentRoom.player_two) {
        return "Player Two";
      } else {
        return res.status(400).send({
          code: 400,
          status: "error",
          message: "Not a room player",
        });
      }
    };

    !choice &&
      res.send({
        code: 400,
        message: "Please add choice to the body.",
      });

    if (currentRoom.result.every((round) => round != "")) {
      res.send("Room sudah selesai");
    } else {
      if (currentPlayer(player) == "Player One") {
        currentRoom.result.map((round) => {
          if (round == "") {
            round = choice;
          }
        });
      } else if (currentPlayer(player) == "Player Two") {
        currentRoom.result.map((round) => {
          if (round == "") {
            round = choice;
          }
        });
      }
    }

    await Game.update(
      { result: currentRoom.result },
      { where: { room: room } }
    ).then(() =>
      res.send({
        code: 200,
        message: "Room updated",
        result: currentRoom.result,
      })
    );
  },

  result: async (req, res) => {
    await Game.findOne({ where: { room: req.params.room } })
      .then((game) => {
        if (game == 0 || game == null) {
          res.status(400).send({
            code: 400,
            status: "error",
            message: "Room not found",
          });
        } else {
          res.status(200).send({
            code: 200,
            message: `The result is ${game.winner}`,
          });
        }
      })
      .catch((err) => res.send(err));
  },
};
