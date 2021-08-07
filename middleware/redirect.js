module.exports = (req, res, next) => {
  if (req.query.user) return next();
  return res.redirect("login");
};
