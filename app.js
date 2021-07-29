const createError = require("http-errors");
const express = require("express");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const router = require("./routes/router");
const api = require("./routes/api");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    cookie: { maxAge: 60000 },
    store: new session.MemoryStore(),
    saveUninitialized: true,
    resave: "true",
    secret: "secret",
  })
);

app.use(router);
app.use(api);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error", {
    title: "Error Pages",
    style: "style",
  });
});

module.exports = app;
