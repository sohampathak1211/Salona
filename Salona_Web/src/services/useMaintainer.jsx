import React from "react";
import {maintainer} from "../utils/api";
import useRequest from "../utils/useRequest";

const useMaintainer = () => {
  const {Request} = useRequest();
  const getSalonMaintainers = async () => {
    try {
      const response = await Request.get(maintainer);
      return response;
    } catch (e) {
      return e;
    }
  };
  const createMaintainer = async (data) => {
    try {
      const response = await Request.post(maintainer, data);
      return response;
    } catch (e) {
      return e;
    }
  };

  const editMaintainer = async (data) => {
    try {
      const response = await Request.patch(maintainer, data);
      return response;
    } catch (e) {
      return e;
    }
  };
  return {getSalonMaintainers, createMaintainer, editMaintainer};
};

export default useMaintainer;
