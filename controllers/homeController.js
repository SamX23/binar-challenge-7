module.exports = {
  index: (req, res) =>
    res.render("index", {
      title: "Traditional Games",
      name: req.query.user,
      style: "style",
    }),
};
