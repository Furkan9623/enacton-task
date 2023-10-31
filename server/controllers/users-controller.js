const uploadImages = require("../configs/cloudinary-config.js");
const { hashPassword, matchPassword } = require("../helpers/hash-password.js");
const generateToken = require("../helpers/jwt-token.js");
const { createError } = require("../middleware/error-handler-middleware.js");
const User = require("../models/users-model.js");

// register user
const registerUserController = async (req, res, next) => {
  const body = JSON.parse(req.body.user);
  const { name, email, password } = body;
  const { userImage } = req.files || "";
  console.log("file", req.files);
  if (!name || !email || !password)
    return next(
      createError("Please fill all the details", 404, "register controller")
    );
  try {
    const existUser = await User.findOne({ email });
    if (existUser)
      return next(
        createError("User already exist..", 400, "register controller")
      );
    const hash_password = await hashPassword(password);
    const upload_image = userImage && (await uploadImages(userImage));
    console.log("upload", upload_image);
    const newUser = new User({
      ...body,
      password: hash_password,
      profileImage: upload_image?.url,
    });
    await newUser.save();
    return res
      .status(200)
      .json({ success: true, message: "User register successfull" });
  } catch (error) {
    return next(createError(error.message, 500, "register controller"));
  }
};
// login user
const loginUserController = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return next(createError("Please "));
  try {
    const existUser = await User.findOne({ email });
    if (!existUser)
      return next(createError("User not available", 500, "login controller"));
    const match_password = await matchPassword(password, existUser?.password);
    if (!match_password)
      return next(createError("Wrong credentials", 500, "login controller"));
    const generate_token = await generateToken(existUser?._id);
    return res.status(200).json({
      success: true,
      message: "login successfull",
      User: {
        name: existUser?.name,
        image: existUser?.profileImage,
        Token: generate_token,
      },
    });
  } catch (error) {
    return next(createError(error.message, 500, "login controller"));
  }
};

module.exports = { registerUserController, loginUserController };
