const CrudRepository = require("./crud-repository");
const User = require("../models/user");
const NotFound = require("../errors/notfound");
class DriverRepository extends CrudRepository {
  constructor() {
    super(User);
  }
  async findDriverById(id) {
    try {
      const driver = await User.findOne({ _id: id, role: "driver" });
      if (!driver) {
        throw new NotFound("Passenger not found", id);
      }
      return driver;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async updateDriverLocation(driverId, location) {
    try {
      const driver = await User.findByIdAndUpdate(
        driverId,
        { location },
        { new: true }
      );
      console.log(driver);
      if (!driver) {
        throw new NotFound("Driver not found", driverId);
      }
      return driver;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
module.exports = DriverRepository;
