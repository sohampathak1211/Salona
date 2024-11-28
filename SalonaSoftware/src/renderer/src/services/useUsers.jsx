import React from 'react'
import useRequest from '../utils/useRequest'
import { toast } from 'react-toastify'

const useUsers = () => {
  const { Request } = useRequest()
  const salonSignIn = async (data) => {
    const res = await window.electron.ipcRenderer.invoke('signinOwner', data)
    return res
  }

  return { salonSignIn }
}

export default useUsers
