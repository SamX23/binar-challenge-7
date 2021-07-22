const express = require("express");
const app = express();

const home = require("./home");
const games = require("./games");
const login = require("./login");
const register = require("./register");
const dashboard = require("./dashboard");
const dashboardUser = require("./dashboard-user");

app.use(home);
app.use(games);
app.use(login);
app.use(register);
app.use(dashboard);
app.use(dashboardUser);

module.exports = app;
