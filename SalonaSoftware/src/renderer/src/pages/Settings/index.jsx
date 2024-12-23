import React, { useEffect } from 'react'
import Maintainer from './Maintainer'
import Branch from './Branch'
import { useDispatch } from 'react-redux'
import { branchFailed, branchRequest, branchSuccess } from '../../slices/branchSlice'
import useBranch from '../../services/useBranch'
import { toast } from 'react-toastify'
import Salon from './Salon'
import SalonOwner from './SalonOwner'

const Settings = () => {
  const { getSalonBranches } = useBranch()
  const dispatch = useDispatch()

  const getBranches = async () => {
    dispatch(branchRequest())
    const data = await getSalonBranches({}, {})
    if (data.error) {
      dispatch(branchFailed(data.error))
      toast.info("You don't have branches. Open the settings page and add a branch to continue")
      return
    }
    dispatch(branchSuccess(data))
    // }
  }

  useEffect(() => {
    getBranches()
  }, [])

  return (
    <div>
      <Salon />
      <Branch />
      <Maintainer />
    </div>
  )
}

export default Settings
