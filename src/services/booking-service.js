const { BookingRepository } = require("../repositories");

const bookingRepository = new BookingRepository();

async function createBooking({ passengerId, source, destination }) {
  try {
    console.log("passengerId", passengerId);
    const bookingData = {
      passenger: passengerId,
      source,
      destination,

      // status: 'pending'
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

module.exports = {
  createBooking,
};
