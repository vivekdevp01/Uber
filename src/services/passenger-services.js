const ConflictError = require("../errors/conflictError");
const NotFound = require("../errors/notfound");
const Booking = require("../models/booking");
const { PassengerRepository, BookingRepository } = require("../repositories");

const passengerRepository = new PassengerRepository();
const bookingRepository = new BookingRepository();

async function getPassengerBooking(passengerId) {
  try {
    // const passengerBooking = await passengerRepository.findById(passengerId);
    const passengerBooking = await Booking.find({
      passenger: passengerId,
    });
    if (!passengerBooking) {
      throw new NotFound("Passenger booking not found", passengerId);
    }
    return passengerBooking;
  } catch (error) {
    throw error;
  }
}
async function provideRating(passengerId, bookingId, rating, feedback) {
  try {
    const booking = await bookingRepository.findBooking({
      _id: bookingId,
      passenger: passengerId,
    });
    // console.log(booking);
    if (!booking) {
      throw new NotFound(
        "Booking not found for the given passenger and booking id"
      );
    }
    booking.rating = rating;
    booking.feedback = feedback;
    await booking.save();
    return booking;
  } catch (error) {
    // console.log(error.name);
    if (error.name === "ValidationError") {
      // error.errors is an object where each key is the name of an invalid field.
      const errors = Object.keys(error.errors).map((field) => ({
        field, // Field name (e.g., "password")
        message: error.errors[field].message, // Error message (e.g., "Path password (1234) is shorter than the minimum allowed length (8).")
      }));
      throw new ConflictError(
        "Validation failed for the provided data. Please correct the errors and try again.",
        errors
      );
    }
    throw error;
  }
}
module.exports = { getPassengerBooking, provideRating };
