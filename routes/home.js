const express = require("express");
const app = express.Router();

// Home Page
app.get("/", (req, res) =>
  res.render("index", {
    title: "Traditional Games",
    name: req.query.user,
  })
);

module.exports = app;
