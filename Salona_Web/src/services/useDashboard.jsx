import React from "react";
import {dashboard} from "../utils/api";
import useRequest from "../utils/useRequest";

const useDashboard = () => {
  const {Request} = useRequest();
  const getHead = async (filter) => {
    try {
      const response = await Request.get(`${dashboard}head/`, {filter});
      return response;
    } catch (e) {
      return e;
    }
  };
  const getDashboard = async (filter) => {
    try {
      const response = await Request.get(`${dashboard}sales_graph/`, {
        params: filter,
      });
      return response;
    } catch (e) {
      return e;
    }
  };
  return {getHead, getDashboard};
};

export default useDashboard;
