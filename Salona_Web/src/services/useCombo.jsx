import React from 'react'
import useRequest from '../utils/useRequest'
import { combo } from '../utils/api'

const useCombo = () => {
  const {Request} = useRequest();
  const createCombo = async (data) => {
    try {
      const response = await Request.post(combo, data)
      return response
    } catch (e) {
      console.error(e)
      return e
    }
  }

  const editCombo = async (data) => {
    try {
      const response = await Request.patch(combo,data)
      return response
    } catch (e) {
      return e
    }
  }

  const getSalonCombos = async () => {
    try {
      const response = await Request.get(combo)
      return response
    } catch (e) {
      return e
    }
  }

  const getBranchCombos = async (data, params) => {
    try {
      const response = await Request.get(combo, { params })
      return response
    } catch (e) {
      return e
    }
  }

  return { createCombo, editCombo, getBranchCombos, getSalonCombos }
}

export default useCombo
