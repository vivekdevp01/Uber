const CrudRepository = require("./crud-repository");
const Booking = require("../models/booking");
const NotFound = require("../errors/notfound");
class BookingRepository extends CrudRepository {
  constructor() {
    super(Booking);
  }
  async createBooking(data) {
    try {
      const booking = await Booking.create(data);
      return booking.populate();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async findBookingsByUser(userId, role) {
    try {
      if (role == "driver") {
        return Booking.find({ driver: userId });
      } else if (role == "passenger") {
        return Booking.find({ rider: userId });
      } else {
        throw new NotFound("Invalid role", role);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async updateBookingStatus(bookingId, driverId, status) {
    try {
      const booking = await Booking.findByIdAndUpdate(
        {
          _id: bookingId,
          status: "pending",
        },
        { driverId: driverId, status },
        { new: true }
      );
      if (!booking) {
        throw new NotFound("Booking not found", bookingId);
      }
      return booking;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async findBooking(criteria) {
    try {
      return await Booking.findOne(criteria);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
module.exports = BookingRepository;
