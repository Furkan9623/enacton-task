import axios from "axios";
const URL = "http://localhost:8080/api/v1";

const registerUser = async (data) => {
  return axios
    .post(`${URL}/user/register`, data)
    .then((res) => res)
    .catch((er) => er);
};
const loginUser = async (data) => {
  return axios
    .post(`${URL}/user/login`, data)
    .then((res) => res)
    .catch((er) => er);
};

const forgotPassword = async (email) => {
  return axios
    .patch(`${URL}/user/forgot`, { email })
    .then((res) => res)
    .catch((er) => er);
};

const resetPassword = async (data) => {
  console.log("data", data);
  return axios
    .patch(`${URL}/user/reset-password`, data)
    .then((res) => res)
    .catch((er) => er);
};
export { registerUser, loginUser, forgotPassword, resetPassword };
