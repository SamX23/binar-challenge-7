const express = require("express");
const router = express();

router.use(express.Router());

const home = require("../controllers/homeController");
const games = require("../controllers/gamesController");
const login = require("../controllers/loginController");
const register = require("../controllers/registerController");
const dashboardUser = require("../controllers/dashboardUserController");
const dashboard = require("../controllers/dashboardController");

// GET METHOD
router.get("/", home.index);
router.get("/games", games.index);
router.get("/login", login.index);
router.get("/login/auth", login.auth);
router.get("/register", register.index);
router.get("/dashboard", dashboard.index);
router.get("/dashboard/*", dashboard.handler);
router.get("/dashboard-user", dashboardUser.index);

// POST METHOD
router.post("/dashboard/add", dashboard.create);
router.post("/dashboard/edit/:id", dashboard.update);
router.post("/dashboard/delete/:id", dashboard.delete);
router.post("/register/auth", register.register);
// router.post("/dashboard-user", dashboardUser.update);

router.use(dashboard);

module.exports = router;
