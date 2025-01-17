import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { serviceEdit } from '../../../slices/serviceSlice';

const EditService = ({ setEdit, vendorToEdit,}) => {
  const dispatch = useDispatch();
  const [vendor, setVendor] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    duration: ''
  })

  useEffect(() => {
    console.log(vendorToEdit,"vendorToEdit")
    if (vendorToEdit) {
      setVendor(vendorToEdit)
    }
  }, [vendorToEdit])

  const handleClose = () => {
    setEdit(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setVendor({ ...vendor, [name]: value })
  }

  const handleSubmit = () => {
    // window.electron.ipcRenderer
    //   .invoke('updateVendor', vendor)
    //   .then(() => {
    //     setVendorDetails((prevDetails) => prevDetails.map((v) => (v.id === vendor.id ? vendor : v)))
    //     console.log('Updated vendor details:', vendor)
    //   })
    //   .catch((e) => console.log(e))
    // handleClose()
    dispatch(serviceEdit(vendor))
  }

  return (
    <div
      className="relative w-full max-w-2xl max-h-full bg-white"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-4 md:p-5 space-y-4">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900">Name</label>
              <input
                type="text"
                name="name"
                value={vendor.name}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gold focus:border-gold"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">Category</label>
              <input
                type="text"
                name="category"
                value={vendor.category}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gold focus:border-gold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900">Branch</label>
              <input
                type="branch_name"
                name="branch_name"
                contentEditable={false}
                value={vendor?.branch?.address}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gold focus:border-gold"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">Price</label>
              <input
                type="number"
                name="price"
                value={vendor.price}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gold focus:border-gold"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Duration {'(Hours)'}
              </label>
              <input
                type="text"
                name="duration"
                value={vendor.duration}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gold focus:border-gold"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900">Description</label>
              <input
                type="text"
                name="description"
                value={vendor.description}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gold focus:border-gold"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleClose}
              className="text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="text-black font-semibold bg-gold hover:bg-gold/90 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditService
