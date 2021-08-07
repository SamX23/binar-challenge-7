module.exports = (req, res, next) =>
  req.query.user ? next() : res.redirect("login");
