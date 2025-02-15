const express = require("express");

const { BookingController } = require("../../controllers");
const { AuthMiddleware } = require("../../middlewares");
const router = express.Router();

router.post("/", AuthMiddleware.isLoggedIn, BookingController.createBooking);
// router.post(
//   "/signin",
//   UserMiddleware.validateUser(["email", "password"]),
//   UserController.signIn
// );
module.exports = router;
