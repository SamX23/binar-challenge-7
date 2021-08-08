const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("express-flash");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const path = require("path");
const logger = require("morgan");
const passport = require("./lib/passport");
const router = require("./routes/");

app.use(express.urlencoded({ extended: false }));

const oneDay = 1000 * 60 * 60 * 24;

app.use(
  session({
    cookie: { maxAge: oneDay },
    saveUninitialized: false,
    resave: "false",
    secret: "secretsamitoken",
  })
);

app.use(passport.initialize());
app.use(flash());

app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(expressLayouts);
app.set("layout", "./layout");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(router);

app.use((req, res, next) => next(createError(404)));
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
