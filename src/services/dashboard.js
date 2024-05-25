import axios from "axios";

export const createAd = async (data) => {
  return axios.post("/dashboard/add/api", data);
};
