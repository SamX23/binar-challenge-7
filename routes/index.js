const express = require("express");
const router = express();
const restrict = require("../middleware/restrict");
const controller = require("../controllers");

router.use(express.Router());

// GET METHOD
router.get("/", controller.home.index);
router.get("/login", controller.login.index);
router.get("/register", controller.register.index);
router.get("/room-list", controller.roomList.index);

// RESTRICTED GET METHOD
router.get("/dashboard", restrict, controller.dashboard.index);
router.get("/dashboard/*", restrict, controller.dashboard.handler);
router.get("/profile", restrict, controller.profileController.index);
router.get("/history", restrict, controller.gameHistory.index);
router.get("/games/:room", restrict, controller.games.index);

// POST METHOD
router.post("/auth/login", controller.login.auth);
router.post("/auth/register", controller.register.auth);
router.post("/game/create", controller.games.create);
router.post("/profile/update", controller.profileController.update);
router.post("/dashboard/add", controller.dashboard.create);
router.post("/dashboard/edit/:id", controller.dashboard.update);
router.post("/dashboard/delete/:id", controller.dashboard.delete);

module.exports = router;
