import React from "react";
import {product} from "../utils/api";
import useRequest from "../utils/useRequest";

const useProduct = () => {
  const {Request} = useRequest();
  const getSalonProducts = async (data = {}, params = {}) => {
    try {
      const response = await Request.get(product, {params});
      return response;
    } catch (e) {
      return e;
    }
  };
  const createProduct = async (data, param) => {
    try {
      const response = await Request.post(product, data);
      return response;
    } catch (e) {
      return e;
    }
  };
  return {getSalonProducts, createProduct};
};

export default useProduct;
