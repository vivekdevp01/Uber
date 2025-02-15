const BaseError = require("../errors/baseError");
// const { StatusCodes
//  } = require("http-status-codes");
const { StatusCodes } = require("http-status-codes");
function errorHandler(err, req, res, next) {
  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: err.details,
      data: {},
    });
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Internal Server Error",
    error: err,
    data: {},
  });
}
module.exports = errorHandler;
