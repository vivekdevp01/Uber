const { StatusCodes } = require("http-status-codes");
const { BookingService } = require("../services");

async function createBooking(req, res, next) {
  try {
    const { source, destination } = req.body;
    const booking = await BookingService.createBooking({
      passengerId: req.user.id,
      source,
      destination,
    });
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createBooking,
};
