const { StatusCodes } = require("http-status-codes");
const { PassengerService } = require("../services");

async function getPassengerBookings(req, res, next) {
  try {
    console.log("logged in", req.user.id);
    const passengerId = req.user.id;
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

async function provideFeedback(req, res, next) {
  try {
    const passengerId = req.user.id;
    const { bookingId, rating, feedback } = req.body;
    const submit = await PassengerService.provideRating(
      passengerId,
      bookingId,
      rating,
      feedback
    );
    // console.log(submit);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Feedback submitted successfully",
      data: submit,
    });
  } catch (error) {
    next(error);
  }
}
module.exports = {
  getPassengerBookings,
  provideFeedback,
};
