const BadRequest = require("../errors/badRequestError");
const { BookingRepository } = require("../repositories");
const { haversineDistance } = require("../utils/common/distance");
const NotFound = require("../errors/notfound");
const LocationService = require("./location-service");

const bookingRepository = new BookingRepository();
const BASIC_FARE = 50;
const RATE_PER_KM = 12;
async function createBooking({ passengerId, source, destination }) {
  try {
    const distance = haversineDistance(
      source.latitude,
      source.longitude,
      destination.latitude,
      destination.longitude
    );
    console.log(distance);
    const fare = BASIC_FARE + distance * RATE_PER_KM;
    console.log("passengerId", passengerId);
    const bookingData = {
      passenger: passengerId,
      source,
      fare,
      destination,

      status: "pending",
    };
    const booking = await bookingRepository.createBooking(bookingData);

    return booking;
  } catch (error) {
    // console.log(error);
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
async function findNearByDriver(location, radius = 20) {
  try {
    const longitude = parseFloat(location.longitude);
    const latitude = parseFloat(location.latitude);
    const radiuskm = parseFloat(radius);
    if (isNaN(longitude) || isNaN(latitude) || isNaN(radiuskm)) {
      throw new BadRequest("Invalid location or radius");
    }
    const nearByDriver = await LocationService.findNearByDriver(
      longitude,
      latitude,
      radiuskm
    ); //()
    // console.log(nearByDriver);
    return nearByDriver;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
async function assignDriver(bookingId, driverId) {
  try {
    const booking = await bookingRepository.updateBookingStatus(
      bookingId,
      driverId,
      "confirmed"
    );

    if (!booking) {
      throw new NotFound("Booking not found");
    }
    console.log("Booking", booking);
    // await booking.save();
    return booking;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
module.exports = {
  createBooking,
  findNearByDriver,
  assignDriver,
};
