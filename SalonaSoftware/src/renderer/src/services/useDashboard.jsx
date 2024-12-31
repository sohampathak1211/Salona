import React from 'react'

const useDashboard = () => {
  const getHead = async (filter) => {
    return await window.electron.ipcRenderer
      .invoke('getHead', filter)
      .then((data) => {
        return data
      })
      .catch((err) => {
        return err
      })
  }
  const getDashboard = async (filter) => {
    return await window.electron.ipcRenderer
      .invoke('getSalesGraph', filter)
      .then((data) => {
        return data
      })
      .catch((err) => {
        return err
      })
  }
  return { getHead,getDashboard }
}

export default useDashboard
