import axios from "axios";

export const signUp = async (data) => {
  return axios.post("/auth/signup/api", data);
};
