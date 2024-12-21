import React from 'react'
import useRequest from '../utils/useRequest'
import { toast } from 'react-toastify'

const useAuth = () => {
  const salonSignIn = async (data) => {
    return await window.electron.ipcRenderer
      .invoke('signinOwner', data)
      .then((data) => data)
      .catch((e) => e)
  }

  const maintainerSignIn = async (data) => {
    const res = await window.electron.ipcRenderer.invoke('signinMaintainer', data)
    return res
  }

  const getUsers = async (data) => {
    const res = await window.electron.ipcRenderer.invoke('getUsers')
    return res
  }

  return { salonSignIn, maintainerSignIn, getUsers }
}

export default useAuth
