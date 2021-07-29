const express = require("express");
const router = express();

router.use(express.Router());

const home = require("../controllers/homeController");
const games = require("../controllers/gamesController");
const login = require("../controllers/loginController");
const register = require("../controllers/registerController");
const dashboardUser = require("../controllers/dashboardUserController");
const dashboard = require("./dashboard");

// GET METHOD
router.get("/", home.index);
router.get("/games", games.index);
router.get("/login", login.index);
router.get("/login/auth", login.auth);
router.get("/register", register.index);
router.get("/dashboard-user", dashboardUser.index);

// POST METHOD
router.post("/register/auth", register.register);

router.use(dashboard);

module.exports = router;
