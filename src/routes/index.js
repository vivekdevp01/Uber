const express = require("express");
const v1Router = require("./v1");

// const apiRouter = express.Router();

// apiRouter.use("/v1", v1Router);

// module.exports = apiRouter;
module.exports = (io) => {
  const apiRouter = express.Router();
  apiRouter.use("/v1", v1Router(io)); // Pass io properly
  return apiRouter;
};
