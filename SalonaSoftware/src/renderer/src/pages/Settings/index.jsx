import React, { useEffect } from 'react'
import Maintainer from './Maintainer'
import Branch from './Branch'
import { useDispatch } from 'react-redux'
import { branchRequest, branchSuccess } from '../../slices/branchSlice'
import useBranch from '../../services/useBranch'

const Settings = () => {
  const { getSalonBranches } = useBranch()
  const dispatch = useDispatch()

  const getBranches = async () => {
    dispatch(branchRequest())
    const data = await getSalonBranches()
    dispatch(branchSuccess(data))
  }

  useEffect(() => {
    getBranches()
  }, [])

  return (
    <div>
      <Branch />
      <Maintainer />
    </div>
  )
}

export default Settings
