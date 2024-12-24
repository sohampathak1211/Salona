import React from 'react'

const useProduct = () => {
  const getSalonProducts = async (data = {}, params = {}) => {
    return await window.electron.ipcRenderer
      .invoke('getSalonProducts', params)
      .then((data) => {
        return data
      })
      .catch((err) => {
        return err
      })
  }
  const createProduct = async (data, param) => {
    return await window.electron.ipcRenderer
      .invoke('createProduct', data)
      .then((data) => {
        return data
      })
      .catch((err) => {
        return err
      })
  }
  return { getSalonProducts, createProduct }
}

export default useProduct
