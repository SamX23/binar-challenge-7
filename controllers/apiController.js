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
            status: "error",
            message: "Please check your username and password",
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
                status: "error",
                message: "Room exist or invalid input",
              })
            )
      )
      .catch((err) =>
        res.status(400).send({
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
    const choiceWords = ["p", "P", "r", "R", "s", "S"];

    if (!choice) {
      res.status(400).send({
        message: "Please add choice to the body.",
      });
    }

    if (!choiceWords.includes(choice)) {
      res.status(400).send({
        message:
          "Please add a choice of P as Papers, R as Rocks, and S as Scrissors.",
      });
    }

    if (currentRoom == 0 || currentRoom == null) {
      res.status(400).send({
        status: "error",
        message: "Room not found",
      });
    }

    const currentPlayer = (player) => {
      if (player == currentRoom.player_one) {
        return "Player One";
      } else if (player == currentRoom.player_two) {
        return "Player Two";
      } else {
        return res.status(400).send({
          status: "error",
          message: "Not a room player",
        });
      }
    };

    if (currentRoom.result.every((pick) => pick != "")) {
      res.status(400).send({
        message: "Room has been finished, please look at the result.",
      });
    } else {
      if (currentPlayer(player) == "Player One") {
        for (let i = 0; i < currentRoom.result.length; i += 2) {
          if (currentRoom.result[i] == "") {
            currentRoom.result[i] = choice;
            break;
          } else {
            res.status(400).send({
              message: "Error",
              result: "You have out of pick, please wait player 2",
            });
          }
        }
      } else if (currentPlayer(player) == "Player Two") {
        for (let i = 1; i < currentRoom.result.length; i += 2) {
          if (currentRoom.result[i] == "") {
            currentRoom.result[i] = choice;
            break;
          } else {
            res.status(400).send({
              status: "Error",
              message: "You have out of pick, please wait player 2",
            });
          }
        }
      }
    }

    await Game.update(
      { result: currentRoom.result },
      { where: { room: room } }
    ).then(() =>
      res.status(200).send({
        message: "Room updated",
        result: currentRoom.result,
      })
    );
  },

  result: async (req, res) => {
    const currentRoom = await Game.findOne({
      where: { room: req.params.room },
    });

    currentRoom == 0 ||
      (currentRoom == null &&
        res.status(400).send({
          status: "error",
          message: "Room not found",
        }));

    const decide = (choices) => {
      let pairs = choices.join("");

      switch (pairs) {
        case "RR":
        case "PP":
        case "SS":
          return "Draw";
        case "RS":
        case "SP":
        case "PR":
          return "Player One Win";
        case "SR":
        case "PS":
        case "RP":
          return "Player Two Win";
        default:
          return "Match Belum Selesai";
      }
    };

    let result = "";

    if (req.body.round) {
      switch (req.body.round) {
        case 1:
        case "1":
          result = decide(currentRoom.result.slice(0, 2));
          break;
        case 2:
        case "2":
          result = decide(currentRoom.result.slice(2, 4));
          break;
        case 3:
        case "3":
          result = decide(currentRoom.result.slice(4, 6));
          break;
      }
    } else {
      res.status(400).send({
        status: "error",
        message: "Insert a round of 3 to see the result.",
      });
    }

    if (result != "") {
      res.status(200).send({
        message: `${result} at round ${req.body.round}`,
      });
    } else {
      res.status(400).send({
        message: "Result not found, please insert round from 1, 2, and 3.",
        result,
      });
    }
  },
};
