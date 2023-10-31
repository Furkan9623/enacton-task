const bcrypt = require("bcrypt");
const hashPassword = async (password) => {
  const saltRounds = 10;
  return bcrypt
    .hash(password, saltRounds)
    .then((res) => res)
    .catch((er) => er);
};

const matchPassword = async (password, hashPassword) => {
  return bcrypt
    .compare(password, hashPassword)
    .then((res) => res)
    .catch((er) => er);
};
module.exports = { hashPassword, matchPassword };
