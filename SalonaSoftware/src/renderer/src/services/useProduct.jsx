import React from 'react'

const ueProduct = () => {
  const getSalonBranches = async (data = {}, params = {}) => {
    return await window.electron.ipcRenderer
      .invoke('getSalonProducts', params)
      .then((data) => {
        return data
      })
      .catch((err) => {
        return err
      })
  }
  const createBranch = async (data, param) => {
    return await window.electron.ipcRenderer
      .invoke('createProduct', data)
      .then((data) => {
        return data
      })
      .catch((err) => {
        return err
      })
  }
  return { getSalonBranches, createBranch }
}

export default ueProduct
