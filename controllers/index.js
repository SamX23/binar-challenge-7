const home = require("./homeController");
const games = require("./gamesController");
const login = require("./loginController");
const register = require("./registerController");
const dashboardUser = require("./dashboardUserController");
const dashboard = require("./dashboardController");

module.exports = {
  home,
  games,
  login,
  register,
  dashboard,
  dashboardUser,
};
