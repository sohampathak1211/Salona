import React, { useState } from 'react'
import { validateVendor } from '../../../utils/validators'
import { toast } from 'react-toastify'

const CreateVendor = ({ setCreate, create , fetchVendor}) => {
  const [vendor, setVendor] = useState({
    name: '',
    email: '',
    domain: '',
    address: '',
    phone: '',
    gst_no: ''
  })

  const handleClose = () => {
    setCreate(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setVendor({ ...vendor, [name]: value })
  }

  const handleSubmit = () => {
    // Basic input validation can go here
    if (!vendor.name || !vendor.email || !vendor.phone) {
      toast.warn('Please fill out all required fields')
      return
    }

    // Handle vendor creation logic here
    console.log('Vendor details:', vendor)
    window.electron.ipcRenderer.invoke('createVendor', vendor).then((data) => {
      setVendor(data)
      fetchVendor()
      toast.success('Vendor created successfully')
    })
    handleClose()
  }

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className={`fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50 transition-opacity duration-300 ease-out ${create ? 'opacity-100' : 'opacity-0'}`}
      onClick={handleClose}
    >
      <div
        className="relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow transform transition-opacity duration-300 ease-out"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
          <h3 className="text-xl font-semibold text-gray-900">Create Vendor</h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            onClick={handleClose}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
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
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900">Email</label>
                <input
                  type="email"
                  name="email"
                  value={vendor.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900">Domain</label>
                <input
                  type="text"
                  name="domain"
                  value={vendor.domain}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900">GST Number</label>
                <input
                  type="text"
                  name="gst_no"
                  value={vendor.gst_no}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={vendor.phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900">Address</label>
                <input
                  type="text"
                  name="address"
                  value={vendor.address}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateVendor
