const express = require("express");
const router = express();

router.use(express.Router());

const home = require("../controllers/homeController");
const games = require("../controllers/gamesController");
const login = require("../controllers/loginController");
const register = require("../controllers/registerController");
const dashboardUser = require("../controllers/dashboardUserController");
const dashboard = require("./dashboard");

router.get("/", home.index);
router.get("/games", games.index);
router.get("/login", login.index);
router.get("/login/auth", login.auth);
router.get("/register", register.index);
router.post("/register", register.register);

router.use(dashboard);
router.get("/dashboard-user", dashboardUser.index);

module.exports = router;
