const User = require("../models/user");
const CrudRepository = require("./crud-repository");

class UserRepository extends CrudRepository {
  constructor() {
    super(User);
    // this.model = Us/er;
  }
  async findByEmail(email) {
    try {
      const user = await User.findOne({ email: email });
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = UserRepository;
