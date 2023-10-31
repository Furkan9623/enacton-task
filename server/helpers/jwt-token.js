const jwt = require("jsonwebtoken");
const generateToken = async (id) => {
  const jwtSecretKey = process.env.JWT_SECRET_KEY;
  try {
    const token = jwt.sign({ id }, jwtSecretKey, { expiresIn: "1d" });
    return token;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = generateToken;
