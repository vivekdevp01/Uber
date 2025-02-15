const UnauthorizedRequest = require("../errors/unauthorizedError");
const Auth = require("../utils/common/Auth");

function isLoggedIn(req, res, next) {
  console.log(req.cookies);
  if (!req.cookies || !req.cookies.token) {
    throw new UnauthorizedRequest(
      "Invalid credentials.",
      "You must be logged in to access this resource."
    );
  }
  const { token } = req.cookies;
  let decodedToken;
  try {
    decodedToken = Auth.verifyToken(token);
  } catch (error) {
    throw new UnauthorizedRequest(
      "Invalid credentials.",
      "You must be logged in to access this resource."
    );
  }

  req.user = { email: decodedToken.email, id: decodedToken._id };

  next();
}

module.exports = {
  isLoggedIn,
};
