const express = require("express");

const { PassengerController } = require("../../controllers");
const { AuthMiddleware } = require("../../middlewares");
const router = express.Router();

router.get(
  "/",
  AuthMiddleware.isLoggedIn,
  PassengerController.getPassengerBookings
);
// router.post(
//   "/signin",
//   UserMiddleware.validateUser(["email", "password"]),
//   UserController.signIn
// );
module.exports = router;
