import axios from "axios";

function axiosInstance() {
  let token = localStorage.getItem("etoken");

  return axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      "Content-Type": "Application/json",
      "Authorization": `Bearer ${token}`,
      "Accept": "*/*",
    },
  });
}

export default axiosInstance;