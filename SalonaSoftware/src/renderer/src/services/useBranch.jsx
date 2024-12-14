import React from 'react'

const useBranch = () => {
  const getSalonBranches = async (data = {}, params = {}) => {
    return await window.electron.ipcRenderer
      .invoke('getBranchesOfSalon', params)
      .then((data) => {
        return data
      })
      .catch((err) => {
        return err
      })
  }
  const createBranch = async (data, param) => {
    return await window.electron.ipcRenderer
      .invoke('createBranch', data)
      .then((data) => {
        return data
      })
      .catch((err) => {
        return err
      })
  }
  return { getSalonBranches, createBranch }
}

export default useBranch
