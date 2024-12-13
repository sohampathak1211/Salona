import React from 'react'
import useRequest from '../utils/useRequest'
import { toast } from 'react-toastify'
import { deserialize } from '../utils/utils'

const useAuth = () => {
  const salonSignIn = async (data) => {
    try {
      const res = await window.electron.ipcRenderer
        .invoke('signinOwner', data)
        .then((data) => data)
        .catch(e=>e)
      return res
    } catch (e) {
      console.error('Error during salon sign-in:', e)
      return null // Handle errors gracefully
    }
  }

  const maintainerSignIn = async (data) => {
    try {
      const res = await window.electron.ipcRenderer
        .invoke('signinMaintainer', data)
        .then((data) => data)
        .catch(e=>e)
      return res
    } catch (e) {
      console.error('Error during salon sign-in:', e)
      return null
    }
  }

  const getUsers = async (data) => {
    const res = await window.electron.ipcRenderer.invoke('getUsers')
    return res
  }

  return { salonSignIn, maintainerSignIn, getUsers }
}

export default useAuth
