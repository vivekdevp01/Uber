const express = require("express");

const v1Router = express.Router();
const userRouter = require("./user.routes");
v1Router.get("/goog", (req, res) => {
  res.send("Google API Endpoint");
});
v1Router.use("/user", userRouter);
module.exports = v1Router;
