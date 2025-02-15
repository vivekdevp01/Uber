const BadRequest = require("../errors/badRequestError");
const ConflictError = require("../errors/conflictError");
const NotFound = require("../errors/notfound");
const UnauthorizedRequest = require("../errors/unauthorizedError");
const { UserRepository } = require("../repositories");
const Auth = require("../utils/common/Auth");
const userRepository = new UserRepository();

async function signUp(data) {
  try {
    const existingUser = await userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new BadRequest("User already exists", {
        email: data.email,
        suggestion: "Please use a different email address or log in.",
      });
    }
    const user = await userRepository.create(data);
    const token = Auth.generateToken({ email: user.data, id: user.id });
    console.log(token);
    return { user, token };
  } catch (error) {
    console.log(error);
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

    console.log(error);
    throw error;
  }
}
async function signIn(data) {
  try {
    const user = await userRepository.findByEmail(data.email);
    if (!user) {
      throw new NotFound("User not found", data.email);
    }
    const passwordMatch = Auth.checkPassword(data.password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedRequest(
        "Invalid credentials",
        `the password you entered for ${data.email} is incorrect. Please try again..`
      );
    }
    const token = Auth.generateToken({ email: user.data, id: user.id });
    console.log(token);
    return { user, token };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  signUp,
  signIn,
};
