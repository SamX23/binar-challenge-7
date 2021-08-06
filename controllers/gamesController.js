const { Game } = require("../models");

module.exports = {
  index: (req, res, next) => {
    if (req.query.user) {
      res.render("games", {
        title: "Try Out The Games",
        name: req.query.user,
        roomId: req.params.room,
        style: "games",
      });
    } else {
      res.redirect("/");
    }
  },
  create: (req, res, next) =>
    Game.create({
      player_one: req.body.username,
      room: req.body.room,
    })
      .then((game) =>
        res.redirect(`/games/${req.body.room}?user=${req.body.username}`)
      )
      .catch((err) => next(err)),
};
