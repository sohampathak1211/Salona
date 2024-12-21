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
    const res = await window.electron.ipcRenderer.invoke('getAllServices', { params })
    return res
  }

  return { createService, editService, getAllServices }
}

export default useService
