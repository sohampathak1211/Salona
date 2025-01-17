import React from "react";
import useRequest from "../utils/useRequest";
import {salon} from "../utils/api";

const useSalon = () => {
  const {Request} = useRequest();
  const getSalon = async () => {
    try {
      const response = await Request.get(salon);
      return response;
    } catch (error) {
      console.error("Failed to fetch salon data:", error);
      return {error: "Failed to fetch data"};
    }
  };

  const updateSalon = async (data) => {
    try {
      const response = await Request.patch(salon, data);
      return response;
    } catch (error) {
      console.error("Failed to fetch salon data:", error);
      return {error: "Failed to fetch data"};
    }
  };

  const searchSalon = async (search) => {
    try {
      const response = await Request.get(salon, { search })
      return response.data
    } catch (e) {
      console.error('Failed to search salon:', e)
      return { error: 'Failed to search salon' }
    }
  };

  const getNamesAndLocation = async () => {
    try {
      const response = await Request.get(salon, { params })
      return response.data
    } catch (e) {
      console.error('Failed to search salon:', e)
      return { error: 'Failed to search salon' }
    }
  };
  const getBranchNamesAndLocation = async (salon_id) => {
    return await window.electron.ipcRenderer
      .invoke("getNamesAndLocation", {
        names_and_locations: true,
      })
      .then((data) => {
        return data;
      })
      .catch((e) => {
        return e;
      });
  };

  const createSalon = async (details) => {
    try {
      const response = await Request.post(salon, details);
      return response.data;
    } catch (e) {
      return {error: "Failed to search salon"};
    }
  };

  const getSalonOfOwner = async (owner_id) => {
    try {
      const response = await Request.get(salon, { owner_id })
      return response
    } catch (e) {
      console.error('Failed to search salon:', e)
      return { error: 'Failed to search salon' }
    }
  };
  return {
    searchSalon,
    getNamesAndLocation,
    getSalonOfOwner,
    getBranchNamesAndLocation,
    createSalon,
    getSalon,
    updateSalon,
  };
};

export default useSalon;
