const express = require("express");
const {
  registerUserController,
  loginUserController,
} = require("../controllers/users-controller");
const {
  forgotPasswordController,
  resetPasswordController,
} = require("../controllers/forgot-password-controller");
const user_router = express.Router();
// register user
user_router.post("/register", registerUserController);
// login user
user_router.post("/login", loginUserController);

// forgot password
user_router.patch("/forgot", forgotPasswordController);
// resent password
user_router.patch("/reset-password", resetPasswordController);

module.exports = user_router;
