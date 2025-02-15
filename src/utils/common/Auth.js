const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const ServerConfig = require("../../config/server.config");

function checkPassword(plainPassword, encryptedPassword) {
  try {
    return bcrypt.compareSync(plainPassword, encryptedPassword);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

function generateToken(payload) {
  try {
    return jwt.sign(payload, ServerConfig.JWT_SECRET, { expiresIn: "1h" });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

function verifyToken(token) {
  try {
    return jwt.verify(token, ServerConfig.JWT_SECRET);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  checkPassword,
  generateToken,
  verifyToken,
};
