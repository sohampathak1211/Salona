import React from "react";

const useLocalStorage = () => {
  // Retrieve data from localStorage
  const getData = (key) => {
    const data = localStorage.getItem(key);
    try {
      return JSON.parse(data); // Convert JSON string to object
    } catch (e) {
      return data; // Return as string if parsing fails
    }
  };

  // Store data in localStorage
  const setData = (key, value) => {
    if (typeof value === "object") {
      localStorage.setItem(key, JSON.stringify(value)); // Store objects as JSON
    } else {
      localStorage.setItem(key, value); // Store primitive values as-is
    }
  };

  // Clear specific key from localStorage
  const clearData = (key) => {
    localStorage.removeItem(key);
  };

  return { getData, setData, clearData };
};

export default useLocalStorage;
