import React from 'react'
import useRequest from '../utils/useRequest'
import { toast } from 'react-toastify'

const useAuth = () => {
  const salonSignIn = async (data) => {
    const res = await window.electron.ipcRenderer.invoke('signinOwner', data);
    console.log("rez",res)
    return res
  }

  const getUsers = async (data) => {
    const res = await window.electron.ipcRenderer.invoke('getUsers')
    return res
  }

  return { salonSignIn, getUsers }
}

export default useAuth
