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

  add_win: async (req, res) =>
    await User_game_history.increment("win", {
      where: { user_id: req.params.id },
    }).then((user) =>
      res.send({
        code: 200,
        message: "User win data has been updated",
      })
    ),

  add_lose: async (req, res) =>
    await User_game_history.increment("lose", {
      where: { user_id: req.params.id },
    }).then((user) =>
      res.send({
        code: 200,
        message: "User lose data has been updated",
      })
    ),

  add_score: async (req, res) =>
    await User_game_history.increment("score", {
      where: { user_id: req.params.id },
    }).then((user) =>
      res.send({
        code: 200,
        message: "User score data has been updated",
      })
    ),

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

  play: (req, res, next) => {
    const choice_1 = req.body.choice_1;
    const choice_2 = req.body.choice_2;
  },

  turns: async (req, res, next) => {
    const currentPlayer = req.body.username;
    const currentRoom = await Game.findOne({ where: { room: req.body.room } });

    if (currentPlayer == currentRoom.player_one) {
      return res.send({
        code: 200,
        message: "Player One Turns",
        turns: currentRoom.player_one,
      });
    }

    if (currentPlayer == currentRoom.player_two) {
      return res.send({
        code: 200,
        message: "Player Two Turns",
        turns: currentRoom.player_two,
      });
    }
  },

  result: async (req, res) =>
    await Game.update(
      {
        player_one: req.body.player_one,
        player_two: req.body.player_two,
        winner: req.body.winner,
        result: req.body.result,
        times: req.body.times,
      },
      { where: { id: req.params.id } }
    ).then((game) =>
      res.status(200).send({
        code: 200,
        message: "Rooms updated!",
      })
    ),
};
