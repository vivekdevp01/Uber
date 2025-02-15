const NotFound = require("../errors/notfound");
const Booking = require("../models/booking");
const { PassengerRepository } = require("../repositories");

const passengerRepository = new PassengerRepository();

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

module.exports = { getPassengerBooking };
