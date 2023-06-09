// For working with routes
const router = require("express").Router();
const AuthController = require("./controllers/auth-controller");
const ActivateController = require("./controllers/activate-controller");
const authMiddleware = require("./middlewares/auth-middleware");
const roomsController = require("./controllers/rooms-controller");

// for mounting routes of this router
router.post("/api/send-otp", AuthController.sendOtp);
router.post("/api/verify-otp", AuthController.verifyOtp);

//we need middleware as this route need to be protected
//only authenticated user
router.post("/api/activate", authMiddleware, ActivateController.activate);
router.get("/api/refresh", AuthController.refresh);
router.post("/api/logout", authMiddleware, AuthController.logout);
router.post("/api/rooms", authMiddleware, roomsController.create);
router.get("/api/rooms", authMiddleware, roomsController.index);

// exporting all the route
module.exports = router;
