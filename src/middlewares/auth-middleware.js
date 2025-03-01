const UnauthorizedRequest = require("../errors/unauthorizedError");
const Auth = require("../utils/common/Auth");

function isLoggedIn(req, res, next) {
  console.log(req.cookies);
  console.log("Incoming Cookies:", req.cookies); // 👀 Debugging
  console.log("Incoming Headers:", req.headers);
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
    console.log("Logged-in User ID:", decodedToken.id);
  } catch (error) {
    throw new UnauthorizedRequest(
      "Invalid credentials.",
      "You must be logged in to access this resource."
    );
  }

  req.user = { email: decodedToken.email, id: decodedToken.id };
  console.log(req.user);
  next();
}

module.exports = {
  isLoggedIn,
};
