const express = require("express");

// const v1Router = express.Router();
const userRouter = require("./user.routes");
const bookingRouter = require("./booking.routes");
const PassengerRouter = require("./passenger.routes");
const driverRouter = require("./driver.routes");
// v1Router.get("/goog", (req, res) => {
//   res.send("Google API Endpoint");
// });
// v1Router.use("/user", userRouter);
// v1Router.use("/bookings", bookingRouter(io));
// v1Router.use("/passenger", PassengerRouter);
// module.exports = v1Router;
module.exports = (io) => {
  const v1Router = express.Router();
  console.log("[DEBUG] apiRouterFactory - io received:", !!io);
  v1Router.get("/goog", (req, res) => {
    res.send("Google API Endpoint");
  });

  v1Router.use("/user", userRouter); // ✅ No io needed
  v1Router.use("/bookings", bookingRouter(io)); // ✅ Pass io only here
  v1Router.use("/passenger", PassengerRouter); // ✅ No io needed
  v1Router.use("/driver", driverRouter);

  return v1Router;
};
