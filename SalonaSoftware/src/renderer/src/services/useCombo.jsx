import React from 'react'
import useRequest from '../utils/useRequest'

const useCombo = () => {
  const createCombo = async (data) => {
    const res = await window.electron.ipcRenderer.invoke('createCombo', data)
    return res
  }

  const editCombo = async (data) => {
    const res = await window.electron.ipcRenderer.invoke('editCombo', data)
    return res
  }

  const getSalonCombos = async () => {
    const res = await window.electron.ipcRenderer.invoke('getSalonCombos')
    return res
  }

  const getBranchCombos = async (data, params) => {
    return await window.electron.ipcRenderer
      .invoke('getCombos', params)
      .then((data) => {
        return data
      })
      .catch((err) => {
        return err
      })
  }

  return { createCombo, editCombo, getBranchCombos, getSalonCombos }
}

export default useCombo
