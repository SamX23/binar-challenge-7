module.exports = {
  index: (req, res, next) =>
    res.render("games", {
      title: "Try Out The Games",
      name: req.query.user,
    }),
};
