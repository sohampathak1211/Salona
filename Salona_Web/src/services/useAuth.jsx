import React from "react";
import axios from 'axios';
import {toast} from "react-toastify";
import {deserialize} from "../utils/utils";
import {salonMaintainerSignIn, salonOwnerSignIn} from "../utils/api";

const useAuth = () => {
  const salonSignIn = async (data) => {
    try {
      const response = await axios.post(salonOwnerSignIn, data);
      return response.data;
    } catch (e) {
      console.error("Error during salon sign-in:", e);
      return null; // Handle errors gracefully
    }
  };

  const maintainerSignIn = async (data) => {
    try {
      const response = await axios.post(salonMaintainerSignIn, data);
      return response.data;
    } catch (e) {
      console.error("Error during salon sign-in:", e);
      return null;
    }
  };

  return {salonSignIn, maintainerSignIn};
};

export default useAuth;
