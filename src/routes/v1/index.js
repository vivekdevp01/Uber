const express = require("express");

const v1Router = express.Router();
const userRouter = require("./user.routes");
const bookingRouter = require("./booking.routes");
const PassengerRouter = require("./passenger.routes");
v1Router.get("/goog", (req, res) => {
  res.send("Google API Endpoint");
});
v1Router.use("/user", userRouter);
v1Router.use("/bookings", bookingRouter);
v1Router.use("/passenger", PassengerRouter);
module.exports = v1Router;
