const home = require("./homeController");
const games = require("./gamesController");
const auth = require("./authController");
const login = require("./loginController");
const register = require("./registerController");
const profileController = require("./profileController");
const dashboard = require("./dashboardController");
const roomHistory = require("./roomHistoryController");
const roomList = require("./roomListController");
const api = require("./apiController");

module.exports = {
  home,
  auth,
  games,
  login,
  register,
  dashboard,
  profileController,
  roomHistory,
  roomList,
  api,
};
