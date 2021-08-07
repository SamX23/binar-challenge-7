module.exports = {
  index: (req, res) =>
    res.render("register", {
      title: "Register Page",
      userExist: req.query.msg,
      style: "login",
    }),
};
