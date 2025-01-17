import React from "react";
import useRequest from "../utils/useRequest";
import {services} from "../utils/api";

const useService = () => {
  const {Request} = useRequest();
  const createService = async (data) => {
    try {
      const response = await Request.post(services, data);
      return response;
    } catch (e) {
      console.error(e);
      return e;
    }
  };

  const editService = async (data) => {
    try {
      const response = await Request.put(services, data);
      return response;
    } catch (e) {
      return e;
    }
  };

  const getSalonServices = async () => {
    try {
      const response = await Request.get(services);
      return response;
    } catch (e) {
      return e;
    }
  };

  const getAllServices = async (data, params) => {
    const res = await window.electron.ipcRenderer.invoke(
      "getAllServices",
      params
    );
    return res;
  };

  const getBranchServices = async (data, params) => {
    try {
      const response = await Request.get(services, {params});
      return response;
    } catch (e) {
      return e;
    }
  };

  // THIS IS THE REFERENCE FROM THE EXPENSE EASE SOFTWARE
  // window.electron.ipcRenderer
  //     .invoke('updateTruck', vendor)
  //     .then((data) => {
  //       console.log('Suuceessfully updated', data)
  //       fetchTrucks()
  //     })
  //     .catch(() => console.log('error'))
  //   console.log('Updated vendor details:', vendor)

  return {
    createService,
    editService,
    getAllServices,
    getBranchServices,
    getSalonServices,
  };
};

export default useService;
