import React from 'react'
import { branch } from '../utils/api'
import useRequest from '../utils/useRequest';

const useBranch = () => {
  const {Request} = useRequest();
  const getSalonBranches = async (data = {}, params = {}) => {
    try {
      const response = await Request.get(branch, { params })
      return response
    } catch (e) {
      return e
    }
  }
  const createBranch = async (data, param) => {
    try {
      const response = await Request.post(branch, data)
      return response
    } catch (e) {
      return e
    }
  }
  return { getSalonBranches, createBranch }
}

export default useBranch
