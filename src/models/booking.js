const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
  passenger: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  source: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  fare: {
    type: Number,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "completed", "cancelled"],
    default: "pending",
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  feedback: {
    type: String,
    default: null,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
