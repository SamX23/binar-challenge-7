const express = require("express");
const router = express();

router.use(express.Router());

const home = require("../controllers/homeController");
const games = require("../controllers/gamesController");
const login = require("./login");
const register = require("./register");
const dashboard = require("./dashboard");
const dashboardUser = require("./dashboard-user");

router.get("/", home.index);
router.get("/games", games.index);
router.use(login);
router.use(register);
router.use(dashboard);
router.use(dashboardUser);

module.exports = router;
