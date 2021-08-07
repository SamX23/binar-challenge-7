const { Game } = require("../models");
const { User_game } = require("../models");

module.exports = {
  index: (req, res, next) =>
    Game.findOne({
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
  create: (req, res, next) =>
    Game.create({
      player_one: req.body.username,
      room: req.body.room,
    })
      .then((game) =>
        res.redirect(
          `/games/${req.body.room}?user=${req.body.username}&id=${game.id}`
        )
      )
      .catch((err) => next(err)),
};
