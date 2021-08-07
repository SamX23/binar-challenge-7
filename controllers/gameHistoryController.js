const { Game } = require("../models");
module.exports = {
  index: async (req, res) =>
    await Game.findAll({
      order: [["id", "ASC"]],
    }).then((game) =>
      res.status(200).render("gameHistory", {
        title: "Games History",
        style: "dashboard",
        game,
        name: req.query.user,
      })
    ),
};
