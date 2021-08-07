module.exports = {
  index: (req, res, next) =>
    res.render("login", {
      title: "Login Page",
      msg: req.query.msg,
      style: "login",
    }),
};
