import React from 'react'

const useMaintainer = () => {
  const getSalonMaintainers = async () => {
    return await window.electron.ipcRenderer
      .invoke('getMaintainer')
      .then((data) => {
        return data
      })
      .catch((err) => {
        return err
      })
  }
  const createMaintainer = async (data) => {
    return await window.electron.ipcRenderer
      .invoke('createMaintainer', data)
      .then((data) => {
        return data
      })
      .catch((err) => {
        return err
      })
  }
  return { getSalonMaintainers, createMaintainer }
}

export default useMaintainer
