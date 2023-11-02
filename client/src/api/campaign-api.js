import axios from "axios";
const URL = "http://localhost:8080/api/v1";

const addCampaign = async (data) => {
  return axios
    .post(`${URL}/campaign/add-campaign`, data)
    .then((res) => res)
    .catch((er) => er);
};
const getAllCampaigns = async () => {
  return axios
    .get(`${URL}/campaign/get-campaigns`)
    .then((res) => res)
    .catch((er) => er);
};
const incCount = async (id) => {
  return axios
    .patch(`${URL}/campaign/inc-count/${id}`)
    .then((res) => res)
    .catch((er) => er);
};
const deleteUserCampaign = async (id) => {
  return axios
    .delete(`${URL}/campaign/delete/${id}`)
    .then((res) => res)
    .catch((er) => er);
};
export { addCampaign, getAllCampaigns, incCount, deleteUserCampaign };
