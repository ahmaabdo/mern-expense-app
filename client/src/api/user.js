import axios from "axios";

export const apiLogin = request_data => {
  return axios.post("/api/v1/auth", request_data);
};

export const getProfile = token => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return axios.get("/api/v1/userInfo");
};
