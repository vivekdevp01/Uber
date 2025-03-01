const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  PORT: process.env.PORT || 7000,
  ATLAS_URL: process.env.ATLAS_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  REDIS_URL: process.env.REDIS_URL,
};
