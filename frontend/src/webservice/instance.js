import axios from "axios";

function axiosInstance() {
  let token = localStorage.getItem("etoken");

  return axios.create({
    baseURL: "http://localhost:8000",
    headers: {
      "Content-Type": "Application/json",
      "Authorization": `Bearer ${token}`,
      "Accept": "*",
    },
  });
}

export default axiosInstance;