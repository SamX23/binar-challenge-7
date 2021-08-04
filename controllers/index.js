const home = require("./homeController");
const games = require("./gamesController");
const login = require("./loginController");
const register = require("./registerController");
const profileController = require("./profileController");
const dashboard = require("./dashboardController");

module.exports = {
  home,
  games,
  login,
  register,
  dashboard,
  profileController,
};
