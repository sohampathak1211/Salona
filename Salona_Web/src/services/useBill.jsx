import React from 'react'
import { bill } from '../utils/api'
import useRequest from '../utils/useRequest'

const useBill = () => {
  const {Request} = useRequest();
  const getBill = async (params) => {
    const response = await Request.get(bill, { params })
    return response
  }
  const createBill = async (data) => {
    try {
      const response = await Request.post(bill, data)
      return response
    } catch (e) {
      return e
    }
  }
  return { getBill, createBill }
}

export default useBill
