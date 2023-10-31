const sendOtpOnMail = require("../configs/mail-config.js");
const { hashPassword } = require("../helpers/hash-password.js");
const { createError } = require("../middleware/error-handler-middleware.js");
const User = require("../models/users-model.js");

const forgotPasswordController = async (req, res, next) => {
  const { email } = req.body;
  if (!email)
    return next(
      createError("Please provide email..", 404, "forgot controller")
    );
  try {
    const existUser = await User.findOne({ email });
    if (!existUser)
      return next(createError("User not exist..", 500, "forgot controller"));
    const createOtp = Math.floor(Math.random() * 9000) + 1000;
    const currentTime = Date.now() + 2 * 60 * 1000;
    const send_mail = await sendOtpOnMail(email, createOtp);
    console.log(send_mail);
    await User.findOneAndUpdate(
      { email },
      { $set: { "otp.otpCode": createOtp, "otp.expiresOtp": currentTime } },
      { new: true }
    );
    return res
      .status(200)
      .json({ success: true, message: "Otp send on mail.." });
  } catch (error) {
    return next(createError(error.message, 500, "forgot controller"));
  }
};
const resetPasswordController = async (req, res, next) => {
  const { newPassword, email, Otp } = req.body;
  if (!newPassword || !email || !Otp)
    return next(
      createError("Please Provide all details..", 404, "reset controller")
    );
  try {
    const userExist = await User.findOne({ email });
    if (!userExist)
      return next(createError("User not exist..", 400, "reset passwod"));
    if (userExist?.otp?.otpCode !== Number(Otp))
      return next(createError("Otp not match", 400, "resetn controller"));
    let diff = userExist?.otp?.expiresOtp - Date.now();
    if (diff < 0) {
      await User.findOneAndUpdate(
        { email },
        { $unset: { otp: -1 } },
        { new: true }
      );
      return next(createError("Otp Expires..", 400, "reset controller"));
    }
    const hash_password = await hashPassword(newPassword);
    await User.findOneAndUpdate(
      { email },
      {
        $set: { password: hash_password },
        $unset: { otp: -1 },
      },
      { new: true }
    );
    return res.status(200).json({ success: true, message: "password updated" });
  } catch (error) {
    return next(createError(error.message, 500, "reset controller"));
  }
};
module.exports = { forgotPasswordController, resetPasswordController };
