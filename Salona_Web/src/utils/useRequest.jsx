import axios from "axios";
import {useNavigate} from "react-router-dom";
import useLocalStorage from "../services/useLocalStorage";
import {toast} from "react-toastify";

const useRequest = () => {
  const navigation = useNavigate();
  const {getData, setData} = useLocalStorage();
  const Request = axios.create({
    baseURL: import.meta.env.VITE_SALONA_BACKEND_URL || 'http://127.0.0.1:8000/'
  });

  Request.interceptors.request.use(
    async (config) => {
      const token = getData("token");
      console.log("TOKENENNE",token)
      if(token.trim() == "") {
        navigation("/signin");
        return;
      }

      config.headers.Authorization = `Bearer ${token}`;

      if (config.data instanceof FormData) {
        config.headers["Content-Type"] = "multipart/form-data";
      } else {
        config.headers["Content-Type"] = "application/json";
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  Request.interceptors.response.use(
    (response) => response.data,
    async (error) => {
      if (error.response) {
        if (error.response.status === 401) {
          setData("token", "");
          console.log("Unauthorized: Handle Logout or Refresh Token");
          navigation("/signin");
        } else if (error.response.status === 403) {
          return Promise.reject({data: error.response.data, status: 403});
        }
      }
      console.error("Request Error:", error.response?.data || error.message);
      return Promise.reject({error: error.response?.data || error.message});
    }
  );
  return {
    Request,
  };
};

export default useRequest;
