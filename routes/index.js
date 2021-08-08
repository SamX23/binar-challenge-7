const router = require("express").Router();
const {
  restrict,
  redirect,
  tokenCheck,
  loginToken,
  adminOnly,
} = require("../middleware");
const controller = require("../controllers");

// Page Router
router.get("/", controller.home.index);
router.get("/login", controller.login.index);
router.get("/register", controller.register.index);
router.get("/history", controller.roomHistory.index);

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
router.get("/api/v2/rooms", tokenCheck, controller.api.all_room);
router.get("/api/v2/room/:room", tokenCheck, controller.api.room);

router.get("/api/v2/users", adminOnly, controller.api.all_user);
router.get("/api/v2/user/:id", adminOnly, controller.api.user);
router.put("/api/v2/user/edit/:id", adminOnly, controller.api.update_user);
router.delete("/api/v2/user/delete/:id", adminOnly, controller.api.delete_user);

router.put("/api/v2/user/update/win/:id", adminOnly, controller.api.add_win);
router.put("/api/v2/user/update/lose/:id", adminOnly, controller.api.add_lose);
router.put(
  "/api/v2/user/update/score/:id",
  adminOnly,
  controller.api.add_score
);

router.post("/api/v2/auth/register", controller.api.register);
router.post("/api/v2/auth/login", loginToken, controller.api.login);
router.post("/api/v2/room/create", tokenCheck, controller.api.create_room);
router.post("/api/v2/room/:room/join", tokenCheck, controller.api.join);

module.exports = router;
