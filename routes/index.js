const router = require("express").Router();
const restrict = require("../middleware/restrict");
const redirect = require("../middleware/redirect");
const controller = require("../controllers");

router.get("/", controller.home.index);
router.get("/login", controller.login.index);
router.get("/register", controller.register.index);
router.get("/history", controller.gameHistory.index);

// Protected page
router.get("/dashboard", redirect, controller.dashboard.index);
router.get("/dashboard/*", redirect, controller.dashboard.handler);
router.get("/profile", redirect, controller.profileController.index);
router.get("/room-list", redirect, controller.roomList.index);
router.get("/games/:room", redirect, controller.games.index);

router.get("/auth/logout", controller.auth.logout);
router.post("/auth/login", controller.auth.login);
router.post("/auth/register", controller.auth.register);

router.post("/game/create", controller.games.create);
router.post("/profile/update", controller.profileController.update);
router.post("/dashboard/add", controller.dashboard.create);
router.post("/dashboard/edit/:id", controller.dashboard.update);
router.post("/dashboard/delete/:id", controller.dashboard.delete);

// API Router
router.get("/api/v2/auth/whoami", restrict, controller.api.whoami);
router.post("/api/v2/auth/register", controller.api.register);
router.post("/api/v2/auth/login", controller.api.login);

module.exports = router;
