const router = require("express").Router();
const { restrict, redirect, tokenCheck, loginToken } = require("../middleware");
const controller = require("../controllers");

router.get("/", controller.home.index);
router.get("/login", controller.login.index);
router.get("/register", controller.register.index);
router.get("/history", controller.gameHistory.index);

router.get("/auth/logout", controller.auth.logout);
router.post("/auth/login", controller.auth.login);
router.post("/auth/register", controller.auth.register);

router.post("/game/create", controller.games.create);
router.post("/profile/update", controller.profileController.update);
router.post("/dashboard/add", controller.dashboard.create);
router.post("/dashboard/edit/:id", controller.dashboard.update);
router.post("/dashboard/delete/:id", controller.dashboard.delete);

// Protected page
router.get("/dashboard", redirect, controller.dashboard.index);
router.get("/dashboard/*", redirect, controller.dashboard.handler);
router.get("/profile", redirect, controller.profileController.index);
router.get("/room-list", redirect, controller.roomList.index);
router.get("/room/:room", redirect, controller.games.index);

// API Router
router.get("/api/v2/whoami", restrict, controller.api.whoami);
router.get("/api/v2/room", tokenCheck, controller.api.all_room);

router.post("/api/v2/auth/login", loginToken, controller.api.login);
router.post("/api/v2/auth/register", controller.api.register);
router.post("/api/v2/room/create", tokenCheck, controller.api.create_room);
router.get("/api/v2/room/:room", tokenCheck, controller.api.play_room);

module.exports = router;
