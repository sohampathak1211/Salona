import React from 'react'

const useDashboard = () => {
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
  return { getDashboard }
}

export default useDashboard
