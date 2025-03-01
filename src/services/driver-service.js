const LocationService = require("./location-service");
const BadRequest = require("../errors/badRequestError");
const { DriverRepository } = require("../repositories");

const driverRepository = new DriverRepository();

async function getDriverBookings(driverId) {
  try {
    const driverBookings = await driverRepository.findDriverById(driverId);
    return driverBookings;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function updateLocation(driverId, location) {
  try {
    console.log("Received location object:", location);
    const { latitude, longitude } = location;
    console.log("Extracted latitude:", latitude);
    console.log("Extracted longitude:", longitude);
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    if (isNaN(lat) || isNaN(lon)) {
      throw new BadRequest("Invalid latitude or longitude");
    }
    console.log(
      `Adding to Redis: ${lon.toString()} ${lat.toString()} ${driverId}`
    );
    const res = await LocationService.addDriverLocation(driverId, {
      latitude: lat,
      longitude: lon,
    });
    console.log(res);

    const updateLoc = await driverRepository.updateDriverLocation(driverId, {
      type: "Point",
      coordinates: [lon, lat],
    });
    // console.log(updateLoc);
    return updateLoc;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  getDriverBookings,
  updateLocation,
};
