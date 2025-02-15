const express = require("express");

const { PassengerController } = require("../../controllers");
const { AuthMiddleware, UserMiddleware } = require("../../middlewares");
const router = express.Router();

router.get(
  "/",
  AuthMiddleware.isLoggedIn,
  PassengerController.getPassengerBookings
);
router.post(
  "/feedback",
  AuthMiddleware.isLoggedIn,
  UserMiddleware.validateUser(["bookingId", "rating", "feedback"]),
  PassengerController.provideFeedback
);
// router.post(
//   "/signin",
//   UserMiddleware.validateUser(["email", "password"]),
//   UserController.signIn
// );
module.exports = router;
