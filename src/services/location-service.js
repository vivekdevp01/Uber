const { redisClient } = require("../config/redis.config");
const BadRequest = require("../errors/badRequestError");
const NotFound = require("../errors/notfound");

class LocationService {
  async setDriverSocket(driverId, socketId) {
    if (!redisClient.isOpen) {
      console.error("❌ Redis client is not connected!");
      throw new Error("Redis client is not connected");
    }
    if (!driverId || !socketId) {
      console.error("🚨 Error: driverId or socketId is missing!", {
        driverId,
        socketId,
      });
      throw NotFound("driverId and socketId must be valid strings");
    }
    await redisClient.set(`driver:${driverId}`, socketId);
  }
  async getDriverSocket(driverId) {
    return await redisClient.get(`driver:${driverId}`);
  }
  async delDriverSocket(driverId) {
    await redisClient.del(`driver:${driverId}`);
  }
  async addDriverLocation(driverId, location) {
    try {
      // console.log("Inside addDriverLocation");
      // console.log("Driver ID:", driverId);
      // console.log("Latitude:", latitude);
      // console.log("Longitude:", longitude);

      // if (latitude === undefined || longitude === undefined) {
      //   throw new BadRequest(
      //     "Latitude or Longitude is undefined in addDriverLocation"
      //   );
      // }
      // await redisClient.sendCommand([
      //   "GEOADD",
      //   "drivers",
      //   longitude.toString(), // Corrected order: longitude comes first in GEOADD
      //   latitude.toString(),
      //   driverId.toString(),
      // ]);
      // console.log("Inside addDriverLocation");
      // console.log("Driver ID:", driverId);
      // console.log("Location Object:", location);

      // Extract values correctly
      const { latitude, longitude } = location;

      // console.log("Extracted Latitude:", latitude);
      // console.log("Extracted Longitude:", longitude);

      if (latitude === undefined || longitude === undefined) {
        throw new BadRequest(
          "Latitude or Longitude is undefined in addDriverLocation"
        );
      }

      await redisClient.sendCommand([
        "GEOADD",
        "drivers",
        longitude.toString(), // Corrected order: longitude first
        latitude.toString(),
        driverId.toString(),
      ]);
      return { message: "Driver location updated in Redis successfully" };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async findNearByDriver(longitude, latitude, radiuskm) {
    const nearByDriver = await redisClient.sendCommand([
      "GEOSEARCH",
      "drivers",
      "FROMLONLAT",
      longitude.toString(),
      latitude.toString(),
      "BYRADIUS",
      radiuskm.toString(),
      "km",
      "WITHCOORD",
    ]);
    // return nearByDriver.slice(1); // removing the first element as it's the total count of nearby drivers
    return nearByDriver;
  }
  async storeNotifiedDrivers(bookingId, driverIds) {
    for (const driverId of driverIds) {
      const addCount = await redisClient.sAdd(
        `notifiedDrivers:${bookingId}`,
        driverId
      );
    }
    // [notifiedDriver:bkg1=>[1,2,3]]
  }
  async getNotifiedDrivers(bookingId) {
    const nearByDrivers = await redisClient.sMembers(
      `notifiedDrivers:${bookingId}`
    );
    return nearByDrivers;
  }
}

module.exports = new LocationService();
