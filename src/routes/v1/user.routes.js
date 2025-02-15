const express = require("express");

const { UserController } = require("../../controllers");
const { AuthMiddleware, UserMiddleware } = require("../../middlewares");
const router = express.Router();

router.post("/signup", UserController.signUp);
router.post(
  "/signin",
  UserMiddleware.validateUser(["email", "password"]),
  UserController.signIn
);
module.exports = router;
