const express = require("express");

const { DriverController } = require("../../controllers");
const { AuthMiddleware, UserMiddleware } = require("../../middlewares");
const router = express.Router();

router.get("/", AuthMiddleware.isLoggedIn, DriverController.getDriverBookings);
router.post(
  "/location",
  AuthMiddleware.isLoggedIn,
  DriverController.updateLocation
);
// router.post(
//   "/signin",
//   UserMiddleware.validateUser(["email", "password"]),
//   UserController.signIn
// );
module.exports = router;
