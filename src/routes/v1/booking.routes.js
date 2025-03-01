const express = require("express");

const { BookingController } = require("../../controllers");
const { AuthMiddleware } = require("../../middlewares");
// const { createBooking } = require("../../controllers/booking.controller");

console.log(typeof BookingController.createBooking);
module.exports = (io) => {
  console.log("[DEBUG] bookingRouter - io received:", !!io);
  const router = express.Router();
  router.post(
    "/",
    AuthMiddleware.isLoggedIn,
    BookingController.createBooking(io)
  );
  router.post(
    "/confirm",
    AuthMiddleware.isLoggedIn,
    BookingController.confirmBooking(io)
  );
  // router.post(
  //   "/signin",
  //   UserMiddleware.validateUser(["email", "password"]),
  //   UserController.signIn
  // );
  return router;
};
