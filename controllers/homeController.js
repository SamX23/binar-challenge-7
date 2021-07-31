module.exports = {
  index: (req, res) =>
    res.render("index", {
      title: "Traditional Games",
      name: req.query.user,
      msg: req.query.msg,
      style: "style",
    }),
};
