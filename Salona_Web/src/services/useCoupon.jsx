import React from "react";
import useRequest from "../utils/useRequest";
import {coupon} from "../utils/api";

const useCoupon = () => {
  const {Request} = useRequest();
  const createCoupon = async (data) => {
    try {
      const response = await Request.post(coupon, data);
      return response;
    } catch (e) {
      console.error(e);
      return e;
    }
  };

  const editCoupon = async (data) => {
    try {
      const response = await Request.patch(coupon, data);
      return response;
    } catch (e) {
      return e;
    }
  };

  const getSalonCoupons = async () => {
    try {
      const response = await Request.get(coupon);
      return response;
    } catch (e) {
      return e;
    }
  };

  const getBranchCoupons = async (data, params) => {
    try {
      const response = await Request.get(coupon);
      return response;
    } catch (e) {
      return e;
    }
  };

  return {createCoupon, editCoupon, getBranchCoupons, getSalonCoupons};
};

export default useCoupon;
