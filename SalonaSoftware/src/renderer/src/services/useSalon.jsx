import React from 'react'
import useRequest from '../utils/useRequest'

const useSalon = () => {
  const { Request } = useRequest()
  const searchSalon = async (search) => {
    const res = await window.electron.ipcRenderer.invoke('searchSalon', {
      params: { search }
    })
    return res
  }

  const getNamesAndLocation = async () => {
    return await window.electron.ipcRenderer
      .invoke('getNamesAndLocation', {
        names_and_locations: true
      })
      .then((data) => {
        return data
      })
      .catch((e) => {
        return e
      })
  }
  const getBranchNamesAndLocation = async (salon_id) => {
    return await window.electron.ipcRenderer
      .invoke('getNamesAndLocation', {
        names_and_locations: true
      })
      .then((data) => {
        return data
      })
      .catch((e) => {
        return e
      })
  }

  const createSalon = async (details) => {
    return await window.electron.ipcRenderer
      .invoke('createSalon', {
        names_and_locations: true
      })
      .then((data) => {
        return data
      })
      .catch((e) => {
        return e
      })
  }
  return { searchSalon, getNamesAndLocation, getBranchNamesAndLocation, createSalon }
}

export default useSalon
