const { StatusCodes } = require("http-status-codes");
const { BookingService, LocationService } = require("../services");
const { io } = require("../index");
// async function createBooking(req, res, next) {
//   try {
//     const { source, destination } = req.body;
//     const booking = await BookingService.createBooking({
//       passengerId: req.user.id,
//       source,
//       destination,
//     });
//     return res.status(StatusCodes.CREATED).json({
//       success: true,
//       message: "Booking created successfully",
//       data: booking,
//     });
//   } catch (error) {
//     next(error);
//   }
// }
const createBooking = (io) => async (req, res, next) => {
  try {
    // console.log("[DEBUG] Imported createBooking:", typeof createBooking);
    console.log("[DEBUG] createBooking - io exists:", !!io);
    const { source, destination } = req.body;
    // new booking create krte hai
    const booking = await BookingService.createBooking({
      passengerId: req.user.id,
      source,
      destination,
    });
    // then search for nearBy drivers
    const nearByDriver = await BookingService.findNearByDriver(source);
    console.log(nearByDriver);
    // then notified Nearby drivers for new bookings
    const driverIds = [];
    for (const driver of nearByDriver) {
      // gersocketId
      // emit notifi
      // cation
      const driverSocketId = await LocationService.getDriverSocket(driver[0]);
      if (driverSocketId) {
        driverIds.push(driver[0]);
        io.to(driverSocketId).emit("newBooking", {
          bookingId: booking._id,
          source,
          destination,
          fare: booking.fare,
        });
      }
    }
    // store the driverId of nearby driver also in the redis
    await LocationService.storeNotifiedDrivers(booking._id, driverIds);
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

const confirmBooking = (io) => async (req, res, next) => {
  try {
    const { bookingId } = req.body;
    const booking = await BookingService.assignDriver(bookingId, req.user.id);
    const notifiedDriverIds = await LocationService.getNotifiedDrivers(
      bookingId
    );
    console.log("NotifiedDrivers", notifiedDriverIds);
    for (const driverId of notifiedDriverIds) {
      const driverSocketId = await LocationService.getDriverSocket(driverId);
      if (driverSocketId) {
        if (driverId == req.user.id) {
          io.to(driverSocketId).emit("rideConfirmed", {
            bookingId,
            driverId: req.user.id,
          });
        } else {
          io.to(driverSocketId).emit("removeBooking", { bookingId });
        }
      }
    }
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Booking confirmed successfully",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createBooking,
  confirmBooking,
};
