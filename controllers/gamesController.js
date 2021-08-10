const { Game } = require("../models");
const { User_game } = require("../models");

module.exports = {
  index: async (req, res, next) =>
    await Game.findOne({
      where: {
        id: req.query.id,
      },
    }).then((game) =>
      User_game.findOne({
        where: {
          username: req.query.user,
        },
      }).then((player) => {
        res.render("games", {
          title: "Try Out The Games",
          player,
          game,
          style: "games",
        });
      })
    ),
  create: async (req, res, next) =>
    await Game.create({
      player_one: req.body.username,
      room: req.body.room,
    })
      .then((game) =>
        res.redirect(
          `/room/${req.body.room}?user=${req.body.username}&id=${game.id}`
        )
      )
      .catch((err) => next(err)),

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
};
