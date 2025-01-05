import React from 'react'

const useCustomer = () => {
  const getBranchCustomer = async (data) => {
    const res = await window.electron.ipcRenderer.invoke('getBranchCustomer')
    return res
  }
  const getSalonCustomer = async () => {
    const res = await window.electron.ipcRenderer.invoke('getSalonCustomer')
    return res
  }
  return { getBranchCustomer, getSalonCustomer }
}

export default useCustomer
