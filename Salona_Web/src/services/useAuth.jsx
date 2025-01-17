import React from "react";
import useRequest from "../utils/useRequest";
import {toast} from "react-toastify";
import {deserialize} from "../utils/utils";
import {salonMaintainerSignIn, salonOwnerSignIn} from "../utils/api";

const useAuth = () => {
  const {Request} = useRequest();
  const salonSignIn = async (data) => {
    try {
      const response = await Request.post(salonOwnerSignIn, data);
      return response;
    } catch (e) {
      console.error("Error during salon sign-in:", e);
      return null; // Handle errors gracefully
    }
  };

  const maintainerSignIn = async (data) => {
    try {
      const response = await Request.post(salonMaintainerSignIn, data);
      return response;
    } catch (e) {
      console.error("Error during salon sign-in:", e);
      return null;
    }
  };

  return {salonSignIn, maintainerSignIn};
};

export default useAuth;
