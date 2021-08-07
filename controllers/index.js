const home = require("./homeController");
const games = require("./gamesController");
const login = require("./loginController");
const register = require("./registerController");
const profileController = require("./profileController");
const dashboard = require("./dashboardController");
const gameHistory = require("./gameHistoryController");
const roomList = require("./roomListController");

module.exports = {
  home,
  games,
  login,
  register,
  dashboard,
  profileController,
  gameHistory,
  roomList,
};
