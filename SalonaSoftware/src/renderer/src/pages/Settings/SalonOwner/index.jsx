import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, setAuth } from '../../../slices/authSlice'
import useLocalStorage from '../../../services/useLocalStorage'

const SalonOwner = () => {
  const salonOwnerDetails = useSelector(selectUser)
  const { getData } = useLocalStorage()
  const dispatch = useDispatch()

  const getUser = async () => {
    const data = await getData('cUser')
    const token = await getData('token')
    console.log('Data', data)
    dispatch(setAuth({ cUser: data, token: token }))
  }
  console.log('Outer  api', salonOwnerDetails)
  useEffect(() => {
    if (!salonOwnerDetails?.id) {
      console.log('Before api', salonOwnerDetails)
      getUser()
      console.log('After api', salonOwnerDetails)
    }
  }, [salonOwnerDetails])

  return (
    <div className="bg-gray-200 p-2 rounded-lg">
      <p className="text-xs">Owner Details</p>
      <p className="text-xl">{salonOwnerDetails.name}</p>
      <p className="text-md pl-2">{salonOwnerDetails.email}</p>
      <p className="text-md pl-2">{salonOwnerDetails.phone}</p>
    </div>
  )
}

export default SalonOwner
