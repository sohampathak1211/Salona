import React from 'react'

const useBill = () => {
  const getBill = async (params) => {
    return await window.electron.ipcRenderer
      .invoke('getBills', params)
      .then((data) => {
        return data
      })
      .catch((err) => {
        return err
      })
  }
  const createBill = async (data) => {
    return await window.electron.ipcRenderer
      .invoke('createBill', data)
      .then((data) => {
        return data
      })
      .catch((err) => {
        return err
      })
  }
  return { getBill, createBill }
}

export default useBill
