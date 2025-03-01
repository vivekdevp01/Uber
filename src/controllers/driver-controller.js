const BadRequest = require("../errors/badRequestError");
const { DriverService } = require("../services");
const { StatusCodes } = require("http-status-codes");
async function getDriverBookings(req, res, next) {
  try {
    console.log("logged in", req.user.id);
    const driverId = req.user.id;
    const driverBookings = await DriverService.getDriverBookings(driverId);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Driver's bookings fetched successfully",
      data: driverBookings,
    });
  } catch (error) {
    next(error);
  }
}

async function updateLocation(req, res, next) {
  try {
    console.log("Received request body:", req.body);

    const { latitude, longitude } = req.body;

    // Debugging: Log the received latitude and longitude
    console.log("Received latitude:", latitude);
    console.log("Received longitude:", longitude);

    // Validate latitude and longitude
    if (typeof latitude !== "number" || typeof longitude !== "number") {
      throw BadRequest("Latitude and longitude must be numbers");
    }

    const response = await DriverService.updateLocation(req.user.id, {
      latitude,
      longitude,
    });
    console.log("Updated location:", response);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Driver location updated successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
}
module.exports = {
  getDriverBookings,
  updateLocation,
};
