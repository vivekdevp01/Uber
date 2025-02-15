const { StatusCodes } = require("http-status-codes");
const { PassengerService } = require("../services");

async function getPassengerBookings(req, res, next) {
  try {
    console.log("logged in", req.user._id);
    const passengerId = req.user._id;
    const passengerBookings = await PassengerService.getPassengerBooking(
      passengerId
    );
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Passenger Bookings",
      data: passengerBookings,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getPassengerBookings,
};
