const express = require("express");
const router = express();

router.use(express.Router());

const controller = require("../controllers");

// GET METHOD
router.get("/", controller.home.index);
router.get("/games", controller.games.index);
router.get("/login", controller.login.index);
router.get("/register", controller.register.index);
router.get("/dashboard", controller.dashboard.index);
router.get("/dashboard/*", controller.dashboard.handler);
router.get("/profile", controller.profileController.index);

// POST METHOD
router.post("/auth/login", controller.login.auth);
router.post("/auth/register", controller.register.auth);
router.post("/dashboard/add", controller.dashboard.create);
router.post("/dashboard/edit/:id", controller.dashboard.update);
router.post("/dashboard/delete/:id", controller.dashboard.delete);
// router.post("/dashboard-user", profileController.update);

module.exports = router;
