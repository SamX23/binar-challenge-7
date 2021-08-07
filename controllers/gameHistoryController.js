const { Game } = require("../models");
module.exports = {
  index: (req, res) =>
    Game.findAll({
      order: [["id", "ASC"]],
    }).then((game) =>
      res.status(200).render("gameHistory", {
        title: "Games History",
        style: "dashboard",
        game,
      })
    ),
};
