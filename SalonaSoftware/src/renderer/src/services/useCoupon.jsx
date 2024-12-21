import React from 'react'
import useRequest from '../utils/useRequest'

const useCoupon = () => {
  const createCoupon = async (data) => {
    const res = await window.electron.ipcRenderer.invoke('createCoupon', data)
    return res
  }

  const editCoupon = async (data) => {
    const res = await window.electron.ipcRenderer.invoke('editCoupon', data)
    return res
  }

  const getSalonCoupons = async () => {
    const res = await window.electron.ipcRenderer.invoke('getSalonCoupons')
    return res
  }

  const getBranchCoupons = async (data, params) => {
    return await window.electron.ipcRenderer
      .invoke('getCoupons', params)
      .then((data) => {
        return data
      })
      .catch((err) => {
        return err
      })
  }

  return { createCoupon, editCoupon, getBranchCoupons, getSalonCoupons }
}

export default useCoupon
