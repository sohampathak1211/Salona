import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../slices/authSlice'

const SalonOwner = () => {
  const salonOwnerDetails = useSelector(selectUser)
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
