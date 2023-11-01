import axios from "axios";
const URL = "http://localhost:8080/api/v1";

const addCampaign = async (data) => {
  return axios
    .post(`${URL}/campaign/add-campaign`, data)
    .then((res) => res)
    .catch((er) => er);
};
export { addCampaign };
