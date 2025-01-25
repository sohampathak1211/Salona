import React from "react";
import {customer} from "../utils/api";
import useRequest from "../utils/useRequest";

const useCustomer = () => {
  const {Request} = useRequest();
  const getBranchCustomer = async (data) => {
    try {
      const response = await Request.get(customer);
      return response;
    } catch (error) {
      console.error("Failed to fetch company data:", error);
      return {error: "Failed to fetch data"};
    }
  };
  const getSalonCustomer = async () => {
    try {
      const response = await Request.get(customer);
      return response;
    } catch (error) {
      return error;
    }
  };
  const searchByPhone = async (params) => {
    try {
      const response = await Request.get(customer, {params});
      return response;
    } catch (error) {
      return error;
    }
  };
  return {getBranchCustomer, getSalonCustomer, searchByPhone};
};

export default useCustomer;
