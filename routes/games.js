const express = require("express");
const app = express.Router();

// Games Page
app.get("/games", (req, res, next) =>
  res.render("games", {
    title: "Try Out The Games",
    name: req.query.user,
  })
);

module.exports = app;
