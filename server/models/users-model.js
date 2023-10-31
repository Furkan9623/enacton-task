const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "name is required.."] },
    email: {
      type: String,
      validate: [validator.isEmail, "Email format is not correct"],
      required: [true, "email is required"],
    },
    profileImage: String,
    password: { type: String, required: [true, "password is required"] },
    otp: { otpCode: Number, expiresOtp: Number },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
