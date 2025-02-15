const { StatusCodes } = require("http-status-codes");
const { UserService } = require("../services");

async function signUp(req, res, next) {
  try {
    const user = await UserService.signUp({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      role: req.body.role,
      location: req.body.location,
      coordinates: req.body.coordinates,
    });
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
}
async function signIn(req, res, next) {
  try {
    const user = await UserService.signIn({
      email: req.body.email,
      password: req.body.password,
    });
    res.cookie("token", user.token, {
      httpOnly: true,
      maxAge: 6 * 24 * 60 * 60 * 1000,
    });
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "User signed in successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
}
module.exports = {
  signUp,
  signIn,
};
