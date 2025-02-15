const CrudRepository = require("./crud-repository");
const User = require("../models/user");
const NotFound = require("../errors/notfound");
class PassengerRepository extends CrudRepository {
  constructor() {
    super(User);
  }
  async findPassengerById(id) {
    try {
      const passenger = await User.findOne({ _id: id, role: "passenger" });
      if (!passenger) {
        throw new NotFound("Passenger not found", id);
      }
      return passenger;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
module.exports = PassengerRepository;
