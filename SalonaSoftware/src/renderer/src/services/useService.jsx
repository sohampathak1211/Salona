import React from 'react'
import useRequest from '../utils/useRequest'

const useService = () => {
  const createService = async (data) => {
    const res = await window.electron.ipcRenderer.invoke('createService', data)
    return res
  }
  
  const editService = async (data) => {
    const res = await window.electron.ipcRenderer.invoke('editService', data)
    return res
  }
  
  const getAllServices = async (data, params) => {
    const res = await window.electron.ipcRenderer.invoke('getAllServices', params)
    return res
  }
  
  const getBranchServices = async (data, params) => {
    return await window.electron.ipcRenderer
    .invoke('getServices', params)
    .then((data) => {
      return data
    })
    .catch((err) => {
      return err
    })
  }

  // THIS IS THE REFERENCE FROM THE EXPENSE EASE SOFTWARE
  // window.electron.ipcRenderer
  //     .invoke('updateTruck', vendor)
  //     .then((data) => {
  //       console.log('Suuceessfully updated', data)
  //       fetchTrucks()
  //     })
  //     .catch(() => console.log('error'))
  //   console.log('Updated vendor details:', vendor)

  return { createService, editService, getAllServices, getBranchServices }
}

export default useService
